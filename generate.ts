import { defaultTokens, parseTokens } from './src/lib/utils/generate';
import { relative } from 'path';
import { createWriteStream } from 'fs';

const cwd = process.cwd();
const outpath = './src/lib/constants/states.ts';
const ws = createWriteStream(outpath, { flags: 'w' });

export function buildTokens() {

  const tokens = parseTokens(defaultTokens as any);
  const buffer = Buffer.from(tokens, 'utf-8');

  let hasError = false;

  ws.once('error', (err) => {
    console.error(err);
    hasError = true;
  });

  ws.once('close', () => {
    if (hasError) {
      process.stdout.write(
        `  \u001b[31m✖\u001b[0m  @aft: generated output FAILED: "${outpath}"\n`
      );
    } else {
      process.stdout.write(
        `  \u001b[32;1m➜\u001b[0m  @aft: generated output: "${relative(
          cwd,
          outpath
        )}"\n`
      );
    }
  });

  ws.write(buffer, () => {
    ws.destroy();
  });

}