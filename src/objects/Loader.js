const path = require("path");
export default class Loader
{
    getPath(directory, filename)
    {
        return "." + path.resolve("assets", directory, filename);
    }
}
