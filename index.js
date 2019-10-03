'use strict';

function Suite() {
    this.errors = 0;
    this.failures = 0;
    this.passes = 0;
    this.tests = [];
    this.total = 0;
}
Suite.prototype = {
    count() {
        this.log(`ERROR:\t${this.errors}`, 'ERROR');
        this.log(`FAIL:\t${this.failures}`, 'FAIL');
        this.log(`PASS:\t${this.passes}`, 'PASS');
        this.log(`TOTAL:\t${this.total}`, (this.passes === this.total ? 'PASS' : 'FAIL'));
    },
    log: (function() {
        const isBrowser = (typeof window !== 'undefined');
        if (isBrowser) {
            const colors = {
                black: '#000',
                green: '#6F6',
                red: '#F88',
                unset: 'unset',
            };
            const mapping = {
                ERROR: colors.red,
                FAIL: colors.red,
                normal: colors.unset,
                PASS: colors.green,
            };
            return function(message, type = 'normal') {
                const style = `color: ${mapping[type]}`;
                console.log(`%c ${message}`, style);
            };
        } else {
            const colors = {
                black: '\x1b[30m',
                green: '\x1b[92m',
                red: '\x1b[91m',
                reset: '\x1b[0m',
                yellow: '\x1b[93m',
            };
            const mapping = {
                ERROR: colors.red,
                FAIL: colors.red,
                normal: colors.reset,
                PASS: colors.green,
            };
            return function(message, type = 'normal') {
                const style = `${mapping[type]}`;
                console.log(`${style}${message}${colors.reset}`);
            };
        }
    }()),
    reset() {
        this.errors = 0;
        this.failures = 0;
        this.passes = 0;
        this.tests = [];
        this.total = 0;
    },
    test(...args) {
        const suite = this;
        const test = {};
        suite.tests.push(test);

        // If comparators are functions, call them and get their return values
        test.comparators = Array.from(args);
        // Comparison function is always last argument
        test.comparison = test.comparators.pop();
        test.comparatorValues = test.comparators.map(input => {
            if (!(input instanceof Function)) {
                return input;
            }
            try {
                return input();
            } catch (e) {
                return e;
            }
        });

        // Run the comparison function
        test.error;
        test.result;
        try {
            test.result = test.comparison(...test.comparatorValues);
        } catch (e) {
            test.error = e;
        }
        suite.total += 1;

        // Get the outcome of the test
        if (test.error) {
            suite.errors += 1;
            test.status = 'ERROR';
        } else if (test.result === true) {
            suite.passes += 1;
            test.status = 'PASS';
        } else {
            suite.failures += 1;
            test.status = 'FAIL';
        }

        // Generate the test message
        const messageParts = [
            `${suite.total}:\t${test.status}`,
        ];
        test.comparators.forEach((comparator, index) => {
            let comparatorValue = test.comparatorValues[index];
            messageParts.push(`\t${comparator.toString()}`);
            if (test.status !== 'PASS') {
                if (comparatorValue instanceof Error) {
                    comparatorValue = comparatorValue.name;
                }
                messageParts.push(`\t\t= ${comparatorValue}`);
            }
        });
        messageParts.push(`\t${test.comparison}`);
        if (test.status === 'ERROR') {
            messageParts.push(test.error.stack);
        }
        test.message = messageParts.join('\n');
        suite.log(test.message, test.status);

        return test;
    },
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Suite;
};
