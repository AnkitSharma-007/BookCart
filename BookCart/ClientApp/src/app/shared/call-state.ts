/** Enum representing different possible loading states of ajax call */
export enum LoadingState {
  INIT = "INIT",
  LOADING = "LOADING",
  LOADED = "LOADED",
}

/** Enum representing error state of ajax call */
export interface ErrorState {
  errorMessage: string;
}

/**
 * Enum representing call state, which allows combining the loading and
 * error states into one property.
 */
export type CallState = LoadingState | ErrorState;

/** Helper function to extract error, if there is one. */
export function getCallStateError(callState: CallState): string | null {
  if ((callState as ErrorState).errorMessage !== undefined) {
    return (callState as ErrorState).errorMessage;
  }
  return null;
}
