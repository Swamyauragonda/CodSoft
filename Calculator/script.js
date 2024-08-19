document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let operator = null;
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'AC') {
                currentInput = '';
                operator = null;
                previousInput = '';
                display.innerText = '';
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput;
            } else if (value === '=') {
                if (operator && previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                    operator = null;
                    previousInput = '';
                }
            } else if (button.classList.contains('operator')) {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        previousInput = calculate(previousInput, currentInput, operator);
                    } else {
                        previousInput = currentInput;
                    }
                    operator = value;
                    currentInput += value;
                    display.innerText = currentInput;
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.innerText += value;
            }
        });
    });

    function calculate(num1, num2, operator) {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        if (isNaN(n1) || isNaN(n2)) return '';

        switch (operator) {
            case '+':
                return (n1 + n2).toString();
            case '-':
                return (n1 - n2).toString();
            case '*':
                return (n1 * n2).toString();
            case '/':
                return n2 !== 0 ? (n1 / n2).toString() : 'Error';
            default:
                return '';
        }
    }
});
