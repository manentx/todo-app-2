export interface CredentialsType {
  email: string;
  password: string;
}

export enum LoginResult {
  BAD_CREDENTIALS,
  SUCCESS,
  NO_REGISTERED_PROFILE
}

/**
 * Class to handle the authentication
 */
export class CredentialService {
  private readonly CREDENTIALS_KEY = "t0";

  /**
   * Attempt a login
   * @param credentials data for the login
   */
  async login(credentials: CredentialsType): Promise<LoginResult> {
    let credentialsClone = {...credentials};
    const registeredToken: string | null = localStorage.getItem(this.CREDENTIALS_KEY);

    if(!registeredToken) 
      return LoginResult.NO_REGISTERED_PROFILE;

    const clientHashedPassword = await this.convertToHash(credentials.password);
    credentialsClone.password = clientHashedPassword;
    const clientToken = await this.convertToHash(JSON.stringify(credentialsClone));
    
    if(clientToken === registeredToken) 
      return LoginResult.SUCCESS;

    return LoginResult.BAD_CREDENTIALS;
  }

  logout() {

  }

  /**
   * Loads the registered user credentials
   * @returns 
   */
  private loadRegisteredCredentials(): CredentialsType | undefined {
    const item = localStorage.getItem(this.CREDENTIALS_KEY);

    if(item) {
      return JSON.parse(item);
    }

    return undefined;
  }

  /**
   * Register the user that can use this application
   * @param credentials credentials of the new user
   */
  async register(credentials: CredentialsType) {
    let data = {...credentials};
    
    const res = await this.convertToHash(data.password);
    data.password = res;    // ANY PASSWORD MUST ALWAYS BE HASHED
    const credentialsJson = JSON.stringify(data);
    const token = await this.convertToHash(credentialsJson);
    localStorage.setItem(this.CREDENTIALS_KEY, token);
  }

  /**
   * Generate sha256 hash for the password
   * @param message The string to be converted
   * @returns The SHA-256 hash HEX string
   */
  private async convertToHash(message: string): Promise<string> {
    const msgUint8 = new TextEncoder().encode(message); 
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); 
    const hashArray = Array.from(new Uint8Array(hashBuffer)); 
    // Convert binary hash to HEX string hash
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }
}