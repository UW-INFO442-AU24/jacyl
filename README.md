# MindConnect - JACYL (Group 4)

## Published Website:
You can find our published website here: https://mindconnect-af628.web.app/

## Problem Statement: 
“How Might We help 16-20 year olds in King County get connected to mental health resources so they can feel confident, engaged with their community, and equipped to overcome mental health challenges?”

## Research (Problem Statement Expanded - Deliverable 1)
Our group decided to focus on the third Sustainable Development Goal (SDG), Good
Health and Well-Being, as we all have a common interest in psychology and the importance of
educating others on health-related topics. Specifically, we aim to address the mental health needs
of young adults in King County. Our leading question is: How might we help 16-20-year-olds in
King County get connected to mental health resources so they can feel confident, engaged with
their community, and equipped to overcome mental health challenges?

The main concerns we seek to address surrounding mental health as a form of health and
well-being are two-fold. Firstly, mental health barriers still exist in the form of stigmatization of
mental health and stigma around professional help. Secondly, mental health resources are often
scattered and divided into many difficult-to-locate and navigate locations and websites.
The first barrier faced by young people seeking mental health is fear and stigmatization
surrounding professional help. There is still a large amount of social stigma surrounding mental
health, preventing people from going out and seeking help. One meta-analysis of perceived
barriers to mental health found that many youths did not seek mental health due to fear of how
their request would be perceived by others and even by mental health professionals (Gulliver et
al., 2010). In addition to perceived stigma, professionals in the field may actually inadvertently
prevent young adults from seeking mental health. One study found that professionals like general
practitioners (GPs) and school counselors are less likely to be approached as they are seen as less
useful for mental health issues and less trustworthy with private information respectively
(Rickwood et al., 2007). However, that same study found that increased knowledge about mental
health resources or previous experience makes youth more likely to pursue mental health
resources (Rickwood et al., 2007). Our findings indicate that to solve this problem, we need to
take measures to alleviate perceived stigma or alleviate the fear of looking for professional help.
This could be done by creating a more approachable and less intimidating service and providing
services to increase mental health literacy.

Information about mental health services can be scattered across multiple platforms,
making it challenging for young adults to find the right type of help. Many young adults could be
unaware of the mental health resources available in King County, including community centers
or hotlines. This lack of awareness makes it difficult for them to access the help they need. In
addition to scattered sources, many younger Americans, such as Gen Z and millennials, do not
have many reliable or credible sources of information about mental health resources. Many
younger folks turn to social media platforms, which are often places of misinformation (Majlessi,
2022). From the research that we have encountered, one of the core issues that we plan to
address is the dissipation of mental health resources. Moreover, students facing mental health
challenges may feel a lack of connection with those in their communities. This may lead to
feelings of isolation and difficulties with reaching out to others for support, revealing that the
disconnection from their own communities may be an issue as well (Novotney, 2019). Through
our research, the two main challenges for 16-20-year-olds today, in regards to mental health,
include the dissipation of information and lack of community. We hope to address the following
issues by creating a centralized solution that is accessible to adolescents in the King County area,
empowering them to seek out support. One of the ways in implementing a solution would be
creating a web application that concentrates mental health resources into a single location.
Having one area where adolescents can look for resources will allow for greater accessibility in
accessing mental resources. In addition, the application could offer tailored recommendations
based on the mental health challenges the adolescent is facing.

In summary, to create an effective solution we need to create a non-intimidating service
that increases mental health literacy to minimize negative stigma, while centralizing the
information to aid young adults who need mental health assistance.

## Features:
* Home Page: Landing page which allows users to navigate to the map page and introduces them to the site.

* Map: Interactive map that displays all the mental health resources as markers that contain further informations.

* Map Search: Allows users to input a King County zip code to zoom the map to that area. Simplifies the searching process and helps users more easily locate where they live on the map. 

* Map Filter: Allows for map icons to be filtered by what categories they include. Selecting a category will display only map markers that contain all categories selected in the filter.   

* Map Markers: Interactive icons displaying mental health resource data. These include name, address, and contains a button that provides more details as well as a save resource button when users are logged in. 

* Resources (Card) Page: Page displaying all mental health resources as cards for easy visual navigation and search. These cards contain the company logo, name of resource, address, phone number and website as well as a button learn more aboout a resource via a more details page, and a button to save the resource when users are logged in. 

* Resource Filter/Search: The resource search allows for the user to search by name, address, or category of treatment offered, and the filter for resources provides filter options for categories of treatment offered such as type of service, targeted demographics, and more. The search and filter work in tandem to help users more easily find a resource they are looking for. 

* Quiz: Provides quiz to provide mental health information. Once users submit the quiz they will be recommended 3 resources that best apply to their responses to quiz questions about what resource types might fit them best. These resources can be saved similarly to the resource cards and map icons. 

* Resource details page(s): Each map icon, resource card and quiz recommendation contain a click here for more information page. These pages contain further details on the resource and allow the user to save from the more details section of the site. 

* Login: This page allows users to sign in via their email or Google account. After signing in the users will then have the ability to save resources to look at later. 

* Profile: This page is used once users log in. The profile page contains saved resources that a user has saved while navigating the site, and the ability to remove these resources once added. It also contains logout functionality if users wish to logout or change to a different profile.   

* Navbar: Navigation bar allowing for navigation between the various feature pages

* About Page: Displays information about the mission statement, an informative video, and the creators of the site


## Mission: 
Our mission is to empower young adults (16-20 year olds) in King County by providing accessible mental health resources through a user-friendly platform. We aim to reduce stigma surrounding mental health, centralize mental health resources in King County, and facilitate community connections. By providing centralized information and offering tailored support, we hope to create an inclusive environment where young adults can confidently seek help and improve their well-being.


## Group Members
* James Nguyen
* Arya Karki
* Cole Elsasser
* Linda Li
* Ysabelle Olairez


## Development:
- Install npm packages using "npm install"
- Start localhost using "npm run dev"
- Access in browser at http://localhost:5173/
- Ctrl + C to cancel

## Deploy build to firebase hosting service
- npm run build
- firebase deploy


## Developer Information:
* JavaScript
* CSS
* HTML
* React
* Firebase
* Bootstrap
* Leaflet
* React UI Components

## References and Additional Resources
Our data was obtained from [King County's open data](https://data.kingcounty.gov/Health-Wellness/King-County-Mental-Health-and-Substance-Use-Disord/sep3-3pj3/about_data) about mental health resources and was manually cleaned to find resources that fit our demographic of youth adults aged 16-20 years old.

Gulliver, A., Griffiths, K.M. & Christensen, H. Perceived barriers and facilitators to mental
health help-seeking in young people: a systematic review. _BMC Psychiatry 10_, 113
(2010). https://bmcpsychiatry.biomedcentral.com/articles/10.1186/1471-244X-10-113

Ko A. J. (2024). Verification. Cooperative Software Development.
https://faculty.washington.edu/ajko/books/cooperative-software-development

Leaflet. An open-source JavaScript library for interactive maps. (2024). https://leafletjs.com/

Majlessi, S. (2022). Study reveals lack of access as root cause for mental health crisis in america - national council for mental wellbeing. National Council for Mental Wellbeing.
https://www.thenationalcouncil.org/news/lack-of-access-root-cause-mental-health-crisis-i
n-america/

Novotney, A. (2019, May). The risks of social isolation. _American Psychological Association_.
https://www.apa.org/monitor/2019/05/ce-corner-isolation

Rickwood, D. J., Deane, F. P., & Wilson, C. J. (2007). When and how do young people seek
professional help for mental health problems?. _The Medical journal of Australia, 187_(S7),
S35–S39. https://doi.org/10.5694/j.1326-5377.2007.tb01334.x

The React Component Library You always wanted. MUI. (n.d.). https://mui.com/

United Nations. (2024). The 17 goals | sustainable development. https://sdgs.un.org/goals

U.S. Department of Justice Civil Rights Division. (2022, November 22). Guidance on Web
Accessibility and the ADA. ADA.gov. https://www.ada.gov/resources/web-guidance/

