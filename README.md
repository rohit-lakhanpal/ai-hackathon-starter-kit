<!-- Improved compatibility of back to top link: See: https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">
    AI Hackathon Starter Kit
  </h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit">View Demo</a>
    ·
    <a href="https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/issues">Report Bug</a>
    ·
    <a href="https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Welcome to the AI Hackathon Starter Kit! This project has been created to make AI accessible and easy for everyone. Whether you are a beginner with no prior experience or an experienced developer, this starter kit is designed to help you incorporate AI into your apps quickly and easily.

The AI Hackathon Starter Kit has many features that make it an excellent tool for anyone looking to work with AI. 

The tool showcases how to work with the following use cases:
- Transcription (Speech to Text)
- Text Analytics
  - Sentiment Analysis
  - Entity Recognition
  - Special Entity Recognition for Healthcare
  - Pii Recognition
- Speak (Text to Speech)
- Natural Language Generation


This kit removes the complexity of working with AI and allows you to focus on building your app. We have added placeholders for you to add your code and get started quickly. Search for the text "`NOTE TO DEVELOPER: YOUR_MAGIC_GOES_HERE`" to find the placeholders.

```js
var timeoutId = setTimeout(() => {
    /**
     * ***************************************
     * NOTE TO DEVELOPER: YOUR_MAGIC_GOES_HERE
     * ***************************************
     * This is where you would do interesting things 
     * with the words that were spoken.
     */
    setWordsSpoken((prev:string) => {
        return prev + " " + event.privText;
    });
}, wordOffset);
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

These usecases leverage the following technologies:
- Azure Cognitive Services for:
  - Speech [Learn More](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/overview)
  - Language [Learn More](https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/language-detection/overview)
- Azure Open AI [Learn More](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/overview)

Other major frameworks/libraries are listed here:

* [![CognitiveServices][learn.microsoft.com]][CognitiveServices-url]
* [![OpenAI][openai.com]][openai-url]
* [![Node.js][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![Material][mui.com]][mui-url]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/rohit-lakhanpal/ai-hackathon-starter-kit.svg?style=for-the-badge
[contributors-url]: https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/rohit-lakhanpal/ai-hackathon-starter-kit.svg?style=for-the-badge
[forks-url]: https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/network/members
[stars-shield]: https://img.shields.io/github/stars/rohit-lakhanpal/ai-hackathon-starter-kit.svg?style=for-the-badge
[stars-url]: https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/stargazers
[issues-shield]: https://img.shields.io/github/issues/rohit-lakhanpal/ai-hackathon-starter-kit.svg?style=for-the-badge
[issues-url]: https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/issues
[license-shield]: https://img.shields.io/github/license/rohit-lakhanpal/ai-hackathon-starter-kit.svg?style=for-the-badge
[license-url]: https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[mui.com]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[mui-url]: https://mui.com/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[learn.microsoft.com]: https://img.shields.io/badge/Microsoft-666666?style=for-the-badge&logo=microsoft&logoColor=white
[CognitiveServices-url]: https://learn.microsoft.com/en-us/azure/cognitive-services/

[openai.com]: https://img.shields.io/badge/OpenAI-5A5AFF?style=for-the-badge&logo=openai&logoColor=white
[openai-url]: https://openai.com/

[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
