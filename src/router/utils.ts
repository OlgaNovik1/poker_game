export const ROUTER_EVENTS_BUS = new EventTarget();

export function normalizePath(currentHref: string, newPath: string): URL {
  const url = new URL(currentHref);
  url.pathname = /^\//.test(newPath) ? newPath : '/' + [url.pathname, newPath]
    .join('/')
    .split(/\/+/)
    .reduce<string[]>((parts, section) => {
      if (section === '..') {
        parts.pop();
        return parts;
      }

      if (section && section !== '.') {
        parts.push(section);
      }

      return parts;
    }, [])
    .join('/');

  return url;
}

export function templateToRegExp(pathTemplate: string): RegExp {
  return new RegExp('/' + pathTemplate.replace(/:([A-z_]+)/gi, (_, paramName) => {
    return `(?<${paramName}>[^?/]+)`;
  }) + '$');
}

export function isClass<C extends { new(...args: any[]): object }>(term: CallableFunction | C): term is C {
  return typeof term === 'function' && /^\s*class/.test(term.toString());
}
