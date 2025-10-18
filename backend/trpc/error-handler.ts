import { TRPCError } from '@trpc/server';


export const handleTRPCError = (error: unknown): never => {
  console.error('TRPC Error:', error);


  if (error instanceof TRPCError) {
    throw error;
  }


  if (error instanceof Error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: error.message,
      cause: error,
    });
  }


  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
  });
};


export const validateApiKey = (apiKey: string | undefined): string => {
  if (!apiKey || apiKey.trim() === '') {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'API key is required',
    });
  }
  return apiKey;
};


export const withErrorHandler = <T extends (...args: any[]) => Promise<any>>(
  fn: T
): T => {
  return (async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleTRPCError(error);
    }
  }) as T;
};

