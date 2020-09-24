function findOne() {

    const client = await MongoClient.connect(url, {
            useNewUrlParser: true
        })
        .catch(err => {
            console.log(err);
        });

    if (!client) {
        return;
    }

    try {

        const db = client.db("mabase");

        let collection = db.collection('clientes');

        let query = {
            name: ''
        }

        let res = await collection.find(query).toArray();

        console.log(res);

    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }
}

findOne();