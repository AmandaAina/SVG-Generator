// index.js
import inquirer from 'inquirer';
import SVG from 'svg.js';

async function generateLogo() {
    // Prompt user for input
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
    const dwg = SVG(svgFile).size(300, 200);

    // Add text to SVG
    dwg.text(userInput.text).fill(userInput.textColor);

    // Add chosen shape to SVG
    if (userInput.shape === 'Circle') {
        dwg.circle(50).fill(userInput.shapeColor).move(125, 75);
    } else if (userInput.shape === 'Triangle') {
        dwg.polygon([[150, 25], [100, 125], [200, 125]]).fill(userInput.shapeColor);
    } else if (userInput.shape === 'Square') {
        dwg.rect(100, 100).fill(userInput.shapeColor).move(100, 50);
    }

    // Save SVG file
    dwg.save();

    console.log(`Generated ${svgFile}`);
}

// Check if the script is being run directly
if (require.main === module) {
    generateLogo();
}

// Export the function for potential use in other modules
export default generateLogo;
