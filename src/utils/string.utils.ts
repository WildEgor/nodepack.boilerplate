export class StringUtils {

  public static toCamelCase(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 0 === index ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
  }

}
