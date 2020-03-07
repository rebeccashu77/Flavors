const apiKey = 'X7kF378rDNoIOuIImg6BmZhQIzCv8uxYMQ4f721NMU2K2XRSX1gSOOGf85lY-1VufBz0H0JsJiPlOAZQ396Vnc9duDqxfkJowmwrINUoLWiGBlHqY1Z2JnDf4NlSXnYx';

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        })
            .then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map(business => ({
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                        latitude: business.coordinates.latitude,
                        longitude: business.coordinates.longitude,
                        url: business.url,
                        phone: business.display_phone,
                        distance: business.distance,
                        price: business.price,
                        transactions: business.transactions
                    })
                    );
                }
            });


    }
}

export default Yelp;
