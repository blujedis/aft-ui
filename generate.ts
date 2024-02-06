import { defaultTokens, parseTokens } from './src/lib/theme/generate';
import { relative } from 'path';
import { createWriteStream } from 'fs';

const cwd = process.cwd();
const outpath = './src/lib/constants/states.ts';
const ws = createWriteStream(outpath, { flags: 'w' });


export function buildTokens() {

  const tokens = parseTokens(defaultTokens as any);
  const buffer = Buffer.from(tokens, 'utf-8');

  let hasError = false;

  function cleanUp() {
    ws
      .off('error', handleError)
      .off('close', handleClose);
  }

  function handleError(err: any) {
    console.error(err);
    hasError = true;
    cleanUp();
  }

  function handleClose() {
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
    cleanUp();
  }

  ws.once('error', handleError);
  ws.once('close', handleClose);
  ws.write(buffer, () => {
    ws.close();
  });

}