const Product = require("../models/product");
const getAllProductsStatic= async (req,res)=>{

	const search = 'a';

	const products = await Product.find({
		name:{$regex:search,$options:'i'}
	}).sort('name').select('name price').limit(4).skip(4);
	res.status(200).json({nhits:products.length,products})

}


const getAllProducts= async (req,res)=>{
	const {featured,company,name,sort,fields,numericFilters}= req.query
	const total= await Product.find({})
	const queryObject={}
	if(featured){
		queryObject.featured= featured==='true'?true:false
	}
	if(company){
		queryObject.company= company
	}
	if(name){
		queryObject.name={$regex:name,$options:'i'}
	}
	if(numericFilters){
		const operatorMap={
			">":"$gt",
			"<":"$lt",
			"=":"$eq",
			"<=":"$lte",
			">=":"$gte"
		}
		const regEx= /\b(<|>|=|<=|>=)\b/g;
		let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
		const options=['price','rating']
		filters= filters.split(",").forEach((item)=>{
			const [field,operator,value]=item.split("-")
			if(options.includes(field)){
				queryObject[field]={[operator]:Number(value)}
			}
		})
	}

	let result = Product.find(queryObject)

// Logic for sorting the fields
	if(sort){
		const sortList = sort.split(',').join(' ');
		result= result.sort(sortList)
	}else{
		result = result.sort('createdAt')
	}

	// logic for selecting desired fields
	if(fields){
		const fieldList= fields.split(",").join(" ");
		result= result.select(fieldList)
	}

// logic for making the pages
	const page=Number(req.query.page)||1;
	const limit= Number(req.query.limit)||10;
	const skip=(page-1)*limit;

	result= result.skip(skip).limit(limit)
	const products= await result
	res.status(200).json({nbHits:products.length,products,page:`${page} of ${Math.ceil(Number(total.length)/limit)}`})
}

module.exports= {getAllProducts,getAllProductsStatic};
