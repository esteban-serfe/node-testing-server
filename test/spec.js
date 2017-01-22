let nodeTestingServer = require('../index.js').nodeTestingServer;

// Settings for node testing server
nodeTestingServer.config = {
    hostname: 'localhost',
    port: 3001,
    logsEnabled: false,
    pages: {
        '/test.html': `<ul class="items">
                        <li>First</li>
                        <li>Second</li>
                        <li>Third</li>
                        <li>Fourth</li>
                        <li>Fifth</li>
                        <li>Sixth</li>
                        <li>Seventh</li>
                        <li>Eighth</li>
                        <li>Ninth</li>
                        <li>Tenth</li>
                    </ul>`
    }
}

describe('node-testing-server tests', function () {

    beforeAll(function () {
        // Turn off Angular synchronization
        browser.ignoreSynchronization = true;
        // Output some information about current tests process
        console.log(`==> Tests running at: ${process.cwd()}`);
        console.log(`==> With argv: ${process.argv}`);

        // Start node testing server
        nodeTestingServer.start(nodeTestingServer.config.port, nodeTestingServer.config.hostname);
    });

    afterAll(function () {
        // Stop node testing server
        nodeTestingServer.stop();
    });

    it('should get the h1 text from the /index.html main test server page', function () {
        browser.get(`http://${nodeTestingServer.config.hostname}:${nodeTestingServer.config.port}/`);
        browser.sleep(10000);
        let titleMain = element(by.xpath('//h1[@class="title-main"]'));

        expect(titleMain.getText()).toBe('Main page of node testing server');
    });

    it('should get the first list item text from the /test.html server page', function () {
        browser.get(`http://${nodeTestingServer.config.hostname}:${nodeTestingServer.config.port}/test.html`);
        let listItemFirst = element.all(by.css('.items li')).first();

        expect(listItemFirst.getText()).toBe('First');
    });

});
