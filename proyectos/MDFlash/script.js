// script.js
document.getElementById('directory').addEventListener('change', handleDirectoryUpload);

let filesContent = {};

const languageIcons = {
  'JavaScript': 'devicon-javascript-plain',
  'TypeScript': 'devicon-typescript-plain',
  'Python': 'devicon-python-plain',
  'Java': 'devicon-java-plain',
  'Ruby': 'devicon-ruby-plain',
  'PHP': 'devicon-php-plain',
  'HTML': 'devicon-html5-plain',
  'CSS': 'devicon-css3-plain',
  'Sass': 'devicon-sass-original',
  // Add more languages and their icons as needed
};

const importantTechnologies = [
  'react', 'vue', 'angular', 'node', 'express', 'django', 'flask', 'spring', 'rails', 'laravel', 'bootstrap', 'tailwindcss'
];

function handleDirectoryUpload(event) {
  showLoading();
  const files = event.target.files;
  let filesLoaded = 0;
  const totalFiles = files.length;

  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      filesContent[file.webkitRelativePath] = e.target.result;
      filesLoaded++;
      if (filesLoaded === totalFiles) {
        hideLoading();
      }
    };
    reader.readAsText(file);
  }
}

function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}

function promptUserForInfo() {
  const projectName = prompt("Por favor, introduce el nombre del proyecto:");
  const description = prompt("Por favor, introduce la descripción del proyecto:");
  const installation = prompt("Por favor, introduce las instrucciones de instalación:");
  const usage = prompt("Por favor, introduce las instrucciones de uso:");
  const contributing = prompt("Por favor, introduce las directrices para contribuir al proyecto:");
  const license = prompt("Por favor, introduce la licencia del proyecto:");
  
  return {
    projectName,
    description,
    installation,
    usage,
    contributing,
    license
  };
}

function analyzeFiles() {
  let technologies = new Set();
  let languages = new Set();

  for (const [filePath, content] of Object.entries(filesContent)) {
    const fileExtension = filePath.split('.').pop();
    switch (fileExtension) {
      case 'js':
        languages.add('JavaScript');
        break;
      case 'ts':
        languages.add('TypeScript');
        break;
      case 'py':
        languages.add('Python');
        break;
      case 'java':
        languages.add('Java');
        break;
      case 'rb':
        languages.add('Ruby');
        break;
      case 'php':
        languages.add('PHP');
        break;
      case 'html':
        languages.add('HTML');
        break;
      case 'css':
        languages.add('CSS');
        break;
      case 'scss':
        languages.add('Sass');
        break;
    }

    if (/react/i.test(content)) {
      technologies.add('React');
    }
    if (/vue/i.test(content)) {
      technologies.add('Vue');
    }
    if (/angular/i.test(content)) {
      technologies.add('Angular');
    }
    if (/node\.js/i.test(content)) {
      technologies.add('Node.js');
    }
    if (/express/i.test(content)) {
      technologies.add('Express');
    }
    if (/django/i.test(content)) {
      technologies.add('Django');
    }
    if (/flask/i.test(content)) {
      technologies.add('Flask');
    }
    if (/spring/i.test(content)) {
      technologies.add('Spring');
    }
    if (/rails/i.test(content)) {
      technologies.add('Rails');
    }
    if (/laravel/i.test(content)) {
      technologies.add('Laravel');
    }
    if (/bootstrap/i.test(content)) {
      technologies.add('Bootstrap');
    }
    if (/tailwindcss/i.test(content)) {
      technologies.add('Tailwind CSS');
    }
  }

  return {
    technologies: Array.from(technologies).join(', '),
    languages: Array.from(languages).map(lang => ({
      name: lang,
      icon: languageIcons[lang]
    }))
  };
}

function generateReadme() {
  const userInfo = promptUserForInfo();
  const projectInfo = analyzeFiles();

  const languagesIconsHtml = projectInfo.languages.map(lang => `<i class="${lang.icon} text-3xl"></i> ${lang.name}`).join(' ');

  const readmeContent = `
# ${userInfo.projectName}

## Descripción
${userInfo.description}

## Tecnologías Utilizadas
${projectInfo.technologies}

## Lenguajes Utilizados
${languagesIconsHtml}

## Instalación
${userInfo.installation}

## Uso
${userInfo.usage}

## Contribuyendo
${userInfo.contributing}

## Licencia
${userInfo.license}
`;

  document.getElementById('output').innerHTML = `<textarea class="w-full h-64 bg-gray-200 rounded-lg p-4" readonly>${readmeContent}</textarea>`;
  document.getElementById('download-button').disabled = false;
}

function downloadReadme() {
  const readmeContent = document.querySelector('#output textarea').value;
  const blob = new Blob([readmeContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'README.md';
  a.click();
  URL.revokeObjectURL(url);
}
