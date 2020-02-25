import ReprParse from "./index"

describe("Basic tests", () => {
    it("can create an instance of the class", () => {
        new ReprParse("<Hello world>")
    })

    it("should throw for an empty repr", () => {
        expect(() => new ReprParse(undefined)).toThrow(Error)
        expect(() => new ReprParse(null)).toThrow(Error)
    })
})

describe("Non key-value repr parsing tests", () => {
    const data = new ReprParse("<Actor 123456 Millie Bobby Brown>")

    it("has the right object name", () => {
        expect(data.getObjectTypeName()).toEqual("Actor")
    })

    it("has the right number of parts", () => {
        expect(data.getParts().length).toEqual(4)
    })

    it("has the right parts", () => {
        expect(data.getParts()[0]).toEqual("123456")
        expect(data.getParts()[1]).toEqual("Millie")
        expect(data.getParts()[2]).toEqual("Bobby")
        expect(data.getParts()[3]).toEqual("Brown")
    })

    it("should throw if trying to access empty key-value pairs", () => {
        expect(() => data.getKeyValuePairs()).toThrow(Error)
    })

    it("has preserved the repr", () => {
        expect(data.repr).toEqual("<Actor 123456 Millie Bobby Brown>")
    })
})

describe("Key-value repr parsing tests", () => {
    const data = new ReprParse("<Actor id=123456 first=Millie middle=Bobby last=Brown>")

    it("has the right object name", () => {
        expect(data.getObjectTypeName()).toEqual("Actor")
    })

    it("has the right number of parts", () => {
        expect(data.getParts().length).toEqual(4)
    })

    it("doesn't throw when trying to access the key-value object", () => {
        expect(data.getKeyValuePairs()).not.toEqual(null)
    })

    it("has the right parts", () => {
        expect(data.getParts()[0]).toEqual("id=123456")
        expect(data.getParts()[1]).toEqual("first=Millie")
        expect(data.getParts()[2]).toEqual("middle=Bobby")
        expect(data.getParts()[3]).toEqual("last=Brown")
    })

    it("has the expected object output", () => {
        expect(data.getKeyValuePairs()).toEqual({
            id: "123456",
            first: "Millie",
            middle: "Bobby",
            last: "Brown"
        })
    })

    it("has preserved the repr", () => {
        expect(data.repr).toEqual("<Actor id=123456 first=Millie middle=Bobby last=Brown>")
    })
})
