class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keywords = this.queryStr.keywords
         ?  {
                Name: 
                { 
                    $regex: this.queryStr.keywords, 
                    $options: "i" 
                },
                    
            }
         : 
         {};

         console.log(keywords);

        this.query = this.query.find({ ...keywords });
        return this;
    }

    // filter() {
    //     const queryCopy = {...this.queryStr}

    //     ////// Removing some fields for cate
    //     const removingFields = ["keywords", "page","limit"];

    //     removingFields.forEach(key => delete queryCopy[key]);

    //     console.log("Filtered Query:", queryCopy);

    //     this.query = this.query.find(queryCopy);
    //     return this;
    // }

}

module.exports = ApiFeatures;