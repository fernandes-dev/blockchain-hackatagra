declare module 'abi-decoder' {
  function addABI(abi: any[]): void;
  function decodeMethod(data: string): string;
}