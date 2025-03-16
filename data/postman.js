const prodotti = [
    /* Prodotti */
];

pm.test("Invio di prodotti multipli", function () {
    prodotti.forEach((prodotto) => {
        pm.sendRequest(
            {
                url: "https://striveschool-api.herokuapp.com/api/product/",
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Q3MmEzNWQyMGE5ZTAwMTU2MjA4NjEiLCJpYXQiOjE3NDIxNTQyOTQsImV4cCI6MTc0MzM2Mzg5NH0.JPSnCVxkwlBBl69Sgv836R-ZSKq9-3vcAfv-ISJlc7M",
                },
                body: JSON.stringify(prodotto),
            },
            function (err, res) {
                console.log("Risultato per:", prodotto.name, res);
            },
        );
    });
});
