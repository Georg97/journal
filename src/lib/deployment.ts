export function isBetaDeployment(): boolean {
  return process.env.DEPLOYMENT === 'beta';
}
