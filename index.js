// index.js
import inquirer from 'inquirer';
import SVG from 'svg.js';

async function generateLogo() {
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three characters:',
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color (keyword or hexadecimal):',
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['Circle', 'Triangle', 'Square'],
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter shape color (keyword or hexadecimal):',
        },
    ]);

    // Create SVG file
    const svgFile = 'logo.svg';
    const dwg = svgwrite.Drawing(svgFile, { profile: 'tiny' });

    // Add text to SVG
    dwg.text(userInput.text, 10, 30).fill(userInput.textColor);

    // Add chosen shape to SVG
    if (userInput.shape === 'Circle') {
        dwg.circle(150, 100, 50).fill(userInput.shapeColor);
    } else if (userInput.shape === 'Triangle') {
        dwg.polygon([[100, 20], [20, 180], [180, 180]]).fill(userInput.shapeColor);
    } else if (userInput.shape === 'Square') {
        dwg.rect(75, 25, 50, 150).fill(userInput.shapeColor);
    }

    // Save SVG file
    dwg.save();

    console.log(`Generated ${svgFile}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
    generateLogo();
}

module.exports = generateLogo;
