export const formattedObject = (object: Object) => JSON.stringify(object, null, 4)
    .replace(/"([^"]+)":/g, '$1:') // Fixes the key quotes
    .replace(/\n/g, '\n    ');     // Pushes the closing } (and everything else)