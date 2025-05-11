const hex = "[0-9a-fA-F]";

export const uniqueIdPattern = `^${hex}{8}-(${hex}{4}-){3}${hex}{12}$`;
