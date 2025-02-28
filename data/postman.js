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
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZDZiNGU3MDMzNzAwMTUzMTZkY2YiLCJpYXQiOjE3NDA0Mjg5ODAsImV4cCI6MTc0MTYzODU4MH0.LNaQdYGktLh7oHgCc7xoSyJD-kIeh9_Qs8bbTQlBmpg",
                },
                body: JSON.stringify(prodotto),
            },
            function (err, res) {
                console.log("Risultato per:", prodotto.name, res);
            },
        );
    });
});
