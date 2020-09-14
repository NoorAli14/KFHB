import * as path from 'path';
import * as glob from 'glob';
import * as randomize from 'randomatic';

// requires all the files which conform to the given pattern and returns the list of defaults exports
export const requireDefaults = (pattern: string): any => {
  return glob
    .sync(pattern, { cwd: __dirname, absolute: true })
    .map(require)
    .map((imported: { default: any; }) => imported.default);
};

/**
 * graphqlFields string[]
 * @param info
 */
export const graphqlFields = (info: { [key: string]: any }): string[] => {
  const keys = [];
  info.fieldNodes[0].selectionSet.selections.forEach((item: { selectionSet: any; name: { value: any; }; }) => {
    if (!item.selectionSet) {
      keys.push(item.name.value);
    }
  });
  return keys;
};

/**
 * Full path string
 * @param fileOrDir
 */
export const fullPath = (fileOrDir: string): string => {
  return path.join(__dirname, fileOrDir);
};

/**
 * isTruthy  string | boolean
 * @param bool
 */
export const isTruthy = (bool: string | boolean): boolean => {
  try {
    return bool == 'true' || bool == true;
  } catch (e) {
    return false;
  }
};

/**
 * normalizePort port string | number
 * @param param
 */
export const normalizePort = (param: number | string): number | string => {
  const portNumber: number =
    typeof param === 'string' ? parseInt(param, 10) : param;
  if (isNaN(portNumber)) return param;
  else if (portNumber >= 0) return portNumber;
};

/**
 * generate random string
 * @param length
 */
export const generateRandomString = (length: number): string => {
  return Math.random()
    .toString(36)
    .replace(/[^a-zA-Z0-9]+/g, '')
    .substr(0, length);
};

export const redomize = async (opts: any = {pattern: "", length: null}): Promise<string> => {
  const otp = randomize(opts.pattern, opts.length);
  return otp;
}

export const calculateDuration = (date: Date): number => {
  let diff = (new Date().getTime() - date.getTime()) / 1000;
  diff /= 60;
  diff = Math.abs(Math.round(diff));
  return diff;
}