/**
 * Represents the repr.
 */
export default class Repr {
    /**
     * Basic constructor.
     * 
     * @param {String} repr The unparsed repr.
     * @throws If you don't pass a repr or pass undefined.
     */
    constructor(repr) {
        if (!repr) {
            throw new Error("No repr given!")
        }

        this.repr = repr
        this.objectName = null
        this.parts = []
        this.keyValuePairs = undefined
        this.parse()
    }

    /**
     * Parses the repr.
     * This is automatically called by the constructor and should only be called if you change the repr.
     */
    parse() {
        let trimmedToArray = this.repr
            .replace("<", "")
            .replace(">", "")
            .split(" ")

        this.objectName = trimmedToArray[0]
        // remove object type name
        trimmedToArray.reverse().pop()
        trimmedToArray.reverse()
        this.parts = trimmedToArray

        let usesFieldEquals = false
        trimmedToArray.forEach(stringToken => {
            if (stringToken.includes("=")) {
                usesFieldEquals = true
            }
        })

        if (usesFieldEquals) {
            this.keyValuePairs = {}
            trimmedToArray.forEach(item => {
                let theElement = item.split("=")
                this.keyValuePairs[theElement[0]] = theElement[1]
            })
        }
    }

    /**
     * Get the name of the object type (e.g. for "<User me>", the object type would be "User").
     */
    getObjectTypeName() {
        return this.objectName
    }

    getUnparsedRepr() {
        return this.repr
    }

    /**
     * Get the repr parts.
     * 
     * In the case your repr looks like this:
     *   "<User 123456 Billy>"
     * This will be ["123456", "Billy"]
     * 
     * In the case your repr looks like this:
     *   "<User id=123456 firstName=Billy>
     * This will be ["id=123456", "firstName=Billy"]
     * If you want actual key-value pairs for this:
     * @see getKeyValuePairs
     */
    getParts() {
        return this.parts
    }

    getKeyValuePairs() {
        if (!this.keyValuePairs) {
            throw new Error("This repr doesn't use key-value based defining! Use `getParts()` instead.")
        }

        return this.keyValuePairs
    }
}
