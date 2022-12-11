export interface AuthResponseDto {
    id: string;
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
    role: string[];
}