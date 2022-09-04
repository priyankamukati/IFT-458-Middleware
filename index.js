const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');

const tempCustomer = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
);

const templateHTMLCustomer = fs.readFileSync(
    `${__dirname}/template/templateCustomer.html`,
    'utf-8'
);


const dataObj = JSON.parse(tempCustomer);


function getLoanAmount(loanAmount, loanTermYears, interestRate) {
    const amountInFloat = parseFloat(loanAmount);
    const interestAccumulated = amountInFloat * parseFloat(loanTermYears) * parseFloat(interestRate) / 100;
    const amountOwed = amountInFloat + interestAccumulated;
    return amountOwed;
}

const server = httpServer.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);
    if (query.id) {
        if (pathname === '/' || pathname.toLowerCase() === '/customers') {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });

            const customer = dataObj[Number(query.id)];
            const loanAmount = getLoanAmount(customer.loanAmount, customer.loanTermYears, customer.interest);
            const customerHTML = replaceTemplate(templateHTMLCustomer, customer, loanAmount);
            res.end(customerHTML);
        }
    }
    else {
        res.writeHead(404, {
        });
        res.end(`resource not found`)
    }
});

server.listen(8000, 'localhost', () => {
    console.log('Listening to requests on port 8000');
});

