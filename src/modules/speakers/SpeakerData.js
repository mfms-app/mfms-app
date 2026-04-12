import { truncate } from 'lodash';

export const speakers = [
  {
    id: '1',
    name: 'Elena Bonvicini',
    image: require('../../../assets/images/speakers/Elena_Bonvicini_Headshot.jpg'),
    title: 'Founder and Creative Director of EB Denim',
    description: "Elena Bonvicini is the founder and creative director of EB Denim, a Los Angeles–based brand redefining modern American denim. Raised between Southern California and her Midwestern family roots, Bonvicini developed an early appreciation for vintage denim while thrift shopping with her grandmother, reconstructing jeans into coveted pieces she sold to friends. She later studied Public Relations and Entrepreneurship at USC, where she built EB Denim through early influencer marketing and a direct-to-consumer model that quickly resonated with a new generation of women. Since launching her first original denim line in 2021, Bonvicini has evolved EB Denim beyond reworked vintage into a fully realized ready-to-wear collection defined by sculpted silhouettes, architectural lines, and a confident, feminine point of view. The brand has been worn by some of the most recognizable women in culture and leading global retailers picked it up early in its trajectory. In 2024, Bonvicini was named to Forbes 30 Under 30. Today, she continues to expand EB Denim with a focus on precision fit, considered fabrication, and a distinctly modern vision of American style."
},
  {
    id: '2',
    name: 'Danielle Guizio',
    image: require('../../../assets/images/speakers/Danielle_Guizio_Headshot.jpg'),
    title: 'CEO + Designer of Guizio',
    description: "New York-based designer Danielle Guizio founded her namesake womenswear label in 2014. Capturing the essence of subversive sensuality and boldness,  the designer is inspired above all to empower the wearer and celebrate the female form. The ready to wear collection celebrates the modern-day woman who aims to deviate from the traditional and push boundaries in all aspects of life. Woven knits, structured suiting, and signature corsets are emboldened with asymmetrical details, purposeful cut-outs, ruching and custom hardware."  },
  {
    id: '3',
    name: 'Felita Harris',
    image: require('../../../assets/images/speakers/Felita_Harris_Headshot.jpg'),
    title: 'Co-Founder, Executive Director RAISEfashion',
    description: 'Donni (Doniella) Davy is an 2 x Emmy winning makeup artist, makeup department head on HBO’s Euphoria, and founder of Half Magic, making her a trailblazer in the beauty, film, and entertainment industry. \nDonni is a household name in the beauty industry - and now, she’s returning to the set for Euphoria Season 3. She is not only celebrated for her groundbreaking work on the show, but she’s also gained recognition for her artistry with the biggest stars of the moment like Reneé Rapp, Mindy Kaling, and Chappell Roan, whose cultural impact has been monumental this year. \nHer innovative approach has redefined beauty standards in entertainment, igniting a global movement centered on self-expression and creativity. Ultimately, Donni’s impact is undeniable, with her digital presence skyrocketing 120% in Instagram impressions alone, plus a 31% increase in TikTok views between March and September 2024. \nAs a department head of makeup on Euphoria, Donni oversees everything from the initial character designs to final application, making sure each look supports both the character’s emotional journey and the overall story. This includes not only the makeup but also special effects, prosthetics, and intricate details that define the show’s aesthetic. Every choice, from color palettes to bold eyeliner, is made with the camera in mind—ensuring each look is both visually striking and narratively meaningful. \nDonni has mastered the art of using makeup as a powerful storytelling tool, transforming it into a key element that helps define the show’s characters and amplify the emotional impact of the series.',
  },
  {
    id: '4',
    name: 'Francesca Aiello',
    image: require('../../../assets/images/speakers/Francesca_Aiello_Headshot.jpeg'),
    title: 'Founder and Chief Executive Officer of Frankies Bikinis',
    description: "Frankies Bikinis is a female-led lifestyle brand known for their fashion forward designs, innovative fabrics, and inclusive range of styles. Mother and daughter duo, Mimi and Francesca Aiello, began designing bikinis out of their Malibu home in 2012 and since then have built the brand into an internationally recognized company  - collaborating with powerful women like Bella Hadid, Pamela Anderson, Sydney Sweeney, Gigi Hadid, Naomi Osaka, Hailee Steinfeld, and Sofia Richie. Since the company's inception, Francesca has evolved the brand into a beach lifestyle brand, expanding product offerings to include ready-to-wear clothing. Frankies Bikinis designs can be found in retail boutiques nationwide including SSENSE, Kith, and Revolve."
  },
  {
    id: '5',
    name: 'Grace Drettman',
    image: require('../../../assets/images/speakers/Grace_Drettmann_Headshot.jpeg'),
    title: 'Global Partnerships & Media Measurement Lead at Google, Fashion & Lifestyle Brands',
    description: " Grace Drettmann is a global partnerships and media measurement lead at Google, specializing in the intersection of high-end brand storytelling and data-driven commercial strategy. She leads initiatives across Google's most prominent global relationships, such as Nike and LVMH, helping iconic brands translate complex marketing data into long-term growth and meaningful consumer connection. By balancing the storied traditions of luxury and brand heritage with the transformative scale of Google’s technology and AI, she has developed a unique vantage point on the future of media and agentic commerce. A graduate of the University of Michigan’s Ross School of Business, Grace authored a research thesis on the integration of omnichannel efforts across luxury companies, a foundation that continues to inform her perspective on the sustained effort required to maintain brand prestige in a digital-first world." 
},
  {
    id: '6',
    name: 'Jessica Williams',
    image: require('../../../assets/images/speakers/Jessica_Williams_Headshot.jpg'),
    title: 'Head of Brand Marketing & Partnerships of Shopify',
    description: "Jessica is the Head of Brand Marketing and Partnerships at Shopify, where she leads a team focused on inspiring the next generation of entrepreneurs to build with—and love—Shopify. Her team celebrates the grit and glory of entrepreneurship through strategic collaborations with both renowned and emerging creators and cultural icons, including MrBeast, Alix Earle, Emma Chamberlain, Colin & Samir, Cassey Ho, Luka Doncic, Tom Holland, and Chelsea Parke. These partners share their own journeys of building and scaling businesses, inspiring millions to do the same. Before Shopify, Jessica spearheaded consumer partnerships at Coinbase, driving initiatives at the intersection of crypto, sports, music, and fashion. Prior to that, she held diverse product marketing, brand marketing, and partnerships roles at Visa."
},
  {
    id: '7',
    name: 'Kenneth Himmel',
    image: require('../../../assets/images/speakers/Kenneth_Himmel_Headshot.jpg'),
    title: 'President of Related Ross',
    description: "Kenneth A. Himmel is President of Related Ross and a nationally recognized leader in creating transformative destinations. He oversees the firm’s portfolio in West Palm Beach and Palm Beach County, including 2.6 million square feet of office space and 1.5 million square feet in development, with landmark assets such as 360 Rosemary, One Flagler, Phillips Point, and CityPlace Tower. Under his leadership, Related launched and later reinvented CityPlace into a dynamic, year-round center of business and culture that has propelled West Palm Beach’s evolution into a premier destination for residents and corporations. Mr. Himmel has advanced the region’s restaurant, retail, and hospitality landscape, bringing leading brands like Estiatorio Milos, Eataly, Equinox, and Alo, and developing anchors such as RH West Palm and the Hilton West Palm Beach. He also co-leads Related Ross’s luxury residential growth, including The Laurel, South Flagler House, and Shorecrest, redefining waterfront living in Palm Beach County. He is guiding transformative projects such as a mixed-use development in Wellington that will feature a world-renowned K–12 school. Before joining Related Ross, Mr. Himmel led developments of iconic properties, including Hudson Yards and Time Warner Center in New York. A Cornell University and William & Mary graduate, he resides in Palm Beach, Florida."
},
  {
    id: '8',
    name: 'Madison Woolley',
    title: 'Founder & Designer of 23rd & Madison; Co-Founder & Creative Director of PURR Studio and Weddings by PURR',
    image: require('../../../assets/images/speakers/Madison_Woolley_Headshot.jpeg'),
    description: "Madison Woolley is an Australian entrepreneur, leading content creator and creative director with a combined digital reach of over one million. She is the founder of 23rd & Madison, a boutique bridal label made in Australia, and the co-founder of PURR Studio and Weddings by PURR, a creative agency and wedding content arm focused on luxury, editorial storytelling. With a Bachelor of Business (majoring in Marketing and International Business), Madison began her career in the fashion and digital space, building an engaged global audience through her personal brand. Over the past eight years, she has worked with some of the world’s leading luxury brands including YSL Beauty, Prada, Christian Louboutin, Armani, Tory Burch, Jimmy Choo, Marc Jacobs, Revolve and Kate Spade, and has been a long-term brand ambassador for Cathay Pacific. She has spoken on panels, attended global fashion events and worked on international campaigns, bringing insight from both the creator and brand perspectives. Through her experience as a creator and business owner, Madison has built a clear vision that merges fashion, entrepreneurship and creative direction. 23rd & Madison reflects her love of design and fashion-led bridal, while PURR Studio and Weddings by PURR extend that into creative storytelling for brands and couples."  
 },
  {
    id: '9',
    name: 'Marcus Collins',
    title: 'Marketing Professor at the University of Michigan, and Co-Host of From the Culture Podcast', 
    image: require('../../../assets/images/speakers/Marcus_Collins_Headshot.jpeg'),
    description: "Dr. Marcus Collins is an award-winning marketer and cultural translator. He is the former chief strategy officer at Wieden+Kennedy, New York, a marketing professor at the Ross School of Business, University of Michigan, and the author of the best-selling book, For The Culture: The Power Behind What We Buy, What We Do, and Who We Want To Be. Marcus is an inductee into the American Advertising Federation’s Advertising Hall of Achievement and a recipient of the Thinkers50 Radar Distinguished Achievement Award for the idea most likely to shape the future of business management. His strategies and creative contributions have led to the launch and success of McDonald’s cultural resurgence, Google’s “Real Tone” technology, the “Made In America” music festival, and the Brooklyn Nets move from New Jersey to New York, among others. Before his advertising tenure, Marcus worked on iTunes + Nike sports music initiatives at Apple and ran digital strategy for Beyoncé. He writes a column for Forbes’ CMO Network, and contributes to business scholarship."
  },
  {
    id: '10',
    name: 'Melissa Mash',
    title: 'Co-founder and CEO of Dagne Dover',
    image: require('../../../assets/images/speakers/Melissa_Mash_Headshot.jpg'),
    description: "Melissa Shin Mash is Co-founder and CEO of performance bag brand, Dagne Dover. Melissa came up with the idea for Dagne while leading the turn-around at Coach's first UK/EU location in 2009, where she saw the opportunity for a culturally-relevant, digitally-native bag brand that paired performance materials with smart design. Today, Melissa is focused on driving the brand forward through distribution, partnerships and relationships. Melissa and her co-founders are passionate about setting a new standard of leadership, company culture, and workplace norms in hopes of creating a better society. Melissa is a graduate of New York University (BA) and The Wharton School of Business (MBA). Founded in 2013 by Melissa Mash, Deepa Gandhi and Jessy Dover, Dagne Dover is a bag and travel accessories brand recognized by editors and customers for best-in-class products: backpacks, diaper bags, work bags, toiletry bags, etc. Dagne Dover is carried in retailers such as Bloomingdale’s, Babylist, Equinox and Dick’s Sporting Goods House of Sport, among others. Dagne Dover customers reflect various demographics, and Gen Zers through Boomers love the brand because the bags are designed for people who want to feel organized, confident, and prepared for every day."
 },
  {
    id: '11',
    name: 'Olivia Landau',
    title: 'Founder & CEO of The Clear Cut',
    image: require('../../../assets/images/speakers/Olivia_Landau_Headshot.jpg'),
    description: "Olivia Landau is the Founder and CEO of The Clear Cut, the largest digitally native-only natural diamond jewelry company in the U.S., specializing in bespoke bridal and everyday fine jewelry. A fourth-generation diamond expert and G.I.A. Graduate Gemologist (GG), Olivia launched The Clear Cut as an educational blog before evolving it into a leading direct-to-consumer brand revolutionizing diamond buying. Committed to transparency and innovation, The Clear Cut leverages technology to build consumer trust and showcase the provenance of natural diamonds."
    },
  {
    id: '12',
    name: 'Uma Chalik',
    title: 'Investor, Torch Capital', 
    image: require('../../../assets/images/speakers/Uma_Chalik_Headshot.jpg'),
    description: "Uma Chalik is an Investor at Torch Capital, a New York-based early-stage venture capital fund backing consumer technology companies and the infrastructure powering them. At Torch, she focuses on agentic commerce, consumer social, and health and wellness, investing in founders building at the intersection of brand, technology, and consumer experience. Torch's portfolio includes Highsnobiety, Naadam, Sweetgreen, Ro, ZocDoc, and Arcade, the world's first AI product creation platform. Before investing, Uma built her career at the intersection of consumer tech, culture, and commerce. She began her career at Spotify, where she helped launch products like Daylist, Blend, and Collab Playlists. She then joined Dorsia, an early-stage hospitality startup, where she drove partnerships spanning Art Basel Miami, Serpentine Galleries London, and Zona Maco Mexico City. Prior to Torch, Uma was at Eniac Ventures, investing in AI infrastructure. Uma is a University of Michigan Ross School of Business alum, and an alumna of the Michigan Fashion Media Summit."
  },
  {
    id: '13',
    name: 'Nic Byrom',
    title: 'Creative Director, OOTD', 
    image: require('../../../assets/images/speakers/Nic_Byrom_Headshot.jpg'),
    description: "Nic Byrom is the Creative Director of OOTD, a social-first media brand that has accumulated over 1 million followers since its founding in 2024.\nServing as the driving force behind the brand’s visual identity, she has been the pivotal lead in scaling OOTD into a global authority. Since joining OOTD, Nic has uniquely merged a high-street aesthetic with a natural instinct for digital-first storytelling, driven by the pulse of modern fashion hubs. Her vision centers around community, personal style, and redefining the way modern-day fashion content is consumed."
  },
  {
    id: '14',
    name: 'Sasha Mutchnik',
    title: 'Senior Director of Social for GQ Magazine', 
    image: require('../../../assets/images/speakers/Sasha_Mutchnik_Headshot.jpg'),
    description: "Sasha Mutchnik is the Senior Social Director at GQ, where she handles content strategy across the magazine's social platforms. Before GQ, she was the senior social editor for The Cut and New York Magazine. She also writes about style, culture, and nightlife in New York, and makes memes under the alias @starterpacksofnyc."
  },
  {
    id: '15',
    name: 'Haley Polkes',
    title: 'Director of Brand & PR, The Center Brands', 
    image: require('../../../assets/images/speakers/Haley_Polkes_Headshot.jpg'),
    description: "Haley Polkes is the Director of Brand and PR at The Center Brands, an LA-based beauty brand accelerator, and a founding member since its 2019 inception. She leads retail marketing, partnerships, influencer relations, and PR with a thoughtful approach to storytelling and a focus on driving efficiencies across departments, categories, and brands.\nDuring her tenure, the company has reached major milestones including the sale of Naturium to e.l.f. Beauty in 2023 and Phlur to TSG Consumer Partners in 2025, while continuing to grow the company’s portfolio with brands like Cyklar, Prequel, Saltair, MAKE Beauty, and Proper. Haley is a proud University of Michigan alum."
  },
  {
    id: '16',
    name: 'Webber Hudson',
    title: 'Executive Vice President, Retail Leasing and Asset Management Related Ross',
    image: require('../../../assets/images/speakers/Webber_Hudson_Headshot.jpg'),
    description: "Webber Hudson serves as Executive Vice President of Retail Leasing and Asset Management at Related Ross, where he leads the strategic transformation of the company’s mixed-use retail portfolio across Palm Beach County. With more than three decades of experience shaping premier retail destinations, Mr. Hudson brings to the region a legacy of innovation, placemaking, and enduring partnerships with the world’s most recognized global brands.\nDuring his twenty-one-year tenure with Related Companies in New York, Mr. Hudson oversaw the leasing, management, and marketing of Related’s national mixed-use portfolio, setting new standards for integrated retail environments. He was instrumental in the creation of The Shops at Hudson Yards, widely regarded as a global model for next-generation retail integration, as well as in the retail evolution of celebrated urban landmarks, The Shops at Columbus Circle in New York City and The Grand in Los Angeles.\nToday, Hudson applies his deep industry expertise and global relationships to the continued investment of Related Ross’s flagship South Florida projects, leading the reimagination of the 72-acre CityPlace in West Palm Beach and guiding the retail strategy for the newly acquired 28-acre mixed-use development in Wellington. His work reflects a commitment to creating vibrant, experiential environments.\nBefore joining Related in 2004, Hudson served as President of Leasing and Marketing at Urban Retail Properties in Chicago, where he directed leasing initiatives for some of the nation’s most prominent urban centers, including Copley Place in Boston, San Francisco Centre, Century City in Los Angeles, and Chicago icons Water Tower Place and 900 North Michigan.\nA native of Detroit, Hudson is a graduate of Westminster School and Wayne State University. Following a family tradition of active philanthropy and community leadership, he has served on numerous nonprofit boards, including the Edgewood Children’s Center in San Francisco and the American Folk Art Museum in New York City."
  },
  {
    id: '16',
    name: 'Brandon Williams',
    title: 'Creative Director + Celebrity Stylist, Hudson Jeans',
    image: require('../../../assets/images/speakers/Brandon_Williams_Headshot.jpg'),
    description: "Brandon Williams is a Creative Director and celebrity stylist at the forefront of a new era in sports and fashion, known for shaping the modern image of the professional athlete. With a career rooted in styling elite talent, he has pioneered a distinct approach that blends personal style, cultural influence, and brand strategy—elevating athletes into multidimensional figures both on and off the field.\nWilliams currently serves as Creative Director for Hudson Jeans, where he leads the brand’s visual and creative direction across men’s and women’s collections. His work reflects a refined balance of heritage and modernity, bringing a fresh perspective to contemporary denim and lifestyle storytelling.\nOver the course of his career, Williams has worked with leading athletes including Mike Conley, Andrew Wiggins, Joel Embiid, Matt Barnes, Drew Holiday, Jack Flaherty, Dansby Swanson, and Mallory Swanson. Beyond styling, he has played a key role in shaping athlete branding and securing high-impact partnerships, contributing to campaigns and collaborations with global brands such as Nike.\nRecognized for his ability to translate identity into influence, Williams represents a new generation of creative leadership—where styling, direction, and strategy converge to define the future of sports and style."
  },
  {
    id: '17',
    name: 'Steve Shiffman',
    title: 'Strategic Advisor, Coach, & Former CEO of Calvin Klein',
    image: require('../../../assets/images/speakers/Steve_Shiffman_Headshot.png'),
    description: "Steve Shiffman is a visionary executive, strategic advisor, and global retail leader. With decades of experience spanning fashion, luxury, and consumer industries, Shiffman has built a reputation for driving growth, leading organizational change, and delivering sustained financial performance.\nSteve is best known for his tenure at Calvin Klein, where he served as CEO from 2014 to 2019. During this time, he led a comprehensive transformation of the global organization, overseeing more than 12,000 employees and modernizing operations across all regions. Under his leadership, the brand grew from $8 billion to $10 billion in retail sales, expanded across multiple channels including e-commerce and licensing, and significantly increased its global cultural relevance through data-driven marketing and a unified creative vision.\nThroughout his career, Steve has been recognized for his ability to combine strategic insight with operational excellence, fostering innovation while maintaining a strong focus on results. In addition to his executive work, he has served on several boards, supporting organizations across business and philanthropy. Today, he continues to advise, invest in, and mentor organizations seeking to navigate transformation and unlock long-term growth."
  },
  {
    id: '18',
    name: 'Ken Pilot',
    title: 'Founder of Ken Pilot Ventures',
    image: require('../../../assets/images/speakers/Ken_Pilot_Headshot.jpg'),
    description: "Ken Pilot, a veteran retail executive and strategic advisor, has transformed legacy brands and startups in the evolving retail landscape. With over 30 years at Gap, J.Crew, Ralph Lauren, and American Eagle, Ken is renowned for scaling global operations while fostering culture and innovation.\nHis leadership during Gap’s rise under Mickey Drexler solidified his status as a transformative merchant. In 2015, he founded Ken Pilot Ventures, investing in cutting-edge retail tech platforms like Ometria, Firework,Curated For You and Lily AI, focusing on enhancing customer experience and operational efficiency.\nKen’s advisory expertise is highly sought after, notably advising Steve Madden on store transformation and omnichannel integration, and working with Knot Standard, an AI-powered custom menswear brand. In 2023, Ken launched The Retail Pilot: Leaders & Legends podcast, featuring influential voices in retail and consumer leadership, quickly becoming essential listening for founders, executives, and aspiring entrepreneurs."
  },
  {
    id: '19',
    name: 'Kate Davidson Hudson',
    title: 'Founder + CEO of Vêtir',
    image: require('../../../assets/images/speakers/Kate_Davidson_Hudson_Headshot.jpg'),
    description: "Kate Davidson Hudson is the Founder and CEO of Vêtir, an AI-powered luxury styling platform redefining modern clienteling. Through a proprietary blend of artificial intelligence and stylist expertise, Vêtir delivers deeply personalized wardrobe solutions for clients, using contextual insights—such as destination, occasion, climate, and individual preference—to transform how luxury consumers discover and shop.\nWith more than 15 years shaping digital fashion media and ecommerce, Kate has built her career at the intersection of editorial authority, data-driven retail, and emerging technology. She co-founded Editorialist, one of the earliest successful content-driven commerce platforms in fashion, and is widely recognized as a pioneer in content-to-commerce and the evolution of luxury retail online.\nPrior to founding Vêtir, she served as Editor in Chief and Chief Development Officer at global luxury e-tailer LuisaViaRoma, where she launched the brand’s print magazine and digital editorial platform. She previously held senior editorial roles at ELLE and Harper’s Bazaar."
  },
  {
    id: '20',
    name: 'Ali Gropper',
    title: 'MFMS Co-Founder, Celebrity Wardrobe Stylist & Co-Founder, Danielle & Alix',
    image: require('../../../assets/images/speakers/Ali_Gropper_Headshot.png'),
    description: "Ali Gropper’s life and career are a testament to resilience, adaptability, and the power of forging one’s own path. A proud alumna of the University of Michigan, where she majored in Communication & Media (Class of 2018), Ali’s journey to becoming a leading Celebrity Wardrobe Stylist is deeply rooted in her time at U of M.\nGoing into Ali’s senior year, she was passionate to pursue a career in the business of fashion. Leveraging her resources at the university, she created the first-ever fashion-focused program at the university: the Michigan Fashion Media Summit.\nAfter graduation, Ali explored various paths, from Celebrity Relations at global PR agencies to in-house VIP marketing. Her entrepreneurial spirit eventually led her to launch her own celebrity styling business, Danielle & Alix. The namesake brand specializes in styling red carpet events, street style moments, and campaigns for their VIP clientele, alongside their own collaborative partnerships with renowned brands such as Amazon, Revolve, Armani, Victoria’s Secret, and more. Ali’s expertise and influence has made her a recognized leader in the fashion landscape, named Forbes 30 Under 30 in the Art & Style Category."
  },
  {
    id: '21',
    name: 'Wade Bassock',
    title: 'MFMS Co-President',
    image: require('../../../assets/images/speakers/Wade_Bassock_Headshot.jpg'),
    description: 'Wade (he/him) is a senior majoring in User Experience Design and Data Analytics at the School of Information. He joined the MFMS as a sophomore. After serving as the Co-Director of Summit Operations, he is excited to be one of the Co-Presidents this year. Wade’s experience includes interning at Bloomingdale’s and Swimm, an AI startup. Upon graduation, he will be returning to Bloomingdale’s Leadership Development Program in the New York City office. ',
    mfms: true
  },
  {
    id: '22',
    name: 'Ryan Sweeney',
    title: 'MFMS Co-President',
    image: require('../../../assets/images/speakers/Ryan_Sweeney_Headshot.jpg'),
    description: 'Ryan (he/him) is a senior majoring in Communication and Media with a minor in Business. He joined MFMS during his freshman year and has since held several positions on the marketing team, including Marketing Coordinator, Public Relations Manager, Director of Public Relations, and Marketing & Social Liaison. Now, he’s thrilled to be rounding out his time on the student planning team as one of its Co-Presidents. Professionally, Ryan works as a Support Lead, handling data entry for Acosta Sales & Marketing, a marketing agency serving the retail and food service industries. He has also gained experience as a Sales and Marketing Intern for Rebel Nell, a women-owned jewelry company based in Detroit. He also took on an editorial internship for Raandoom, a collaborative media platform that highlights global perspectives on fashion, lifestyle, and arts and culture. Looking ahead, Ryan hopes to pursue opportunities in the entertainment industry and plans to take his skills to Los Angeles after graduating from Michigan.',
    mfms: true
  },
  {
    id: '23',
    name: 'Mani Carnes',
    title: 'MFMS Chief Operating Officer',
    image: require('../../../assets/images/speakers/Mani_Carnes_Headshot.jpg'),
    description: "Mani (she/her) is a senior majoring in Business Administration with a minor in Native American Studies. She joined MFMS during her sophomore year. After serving as the External DEI Chair on the DEI Team, she is excited to dive into the role of COO for her final year on the team. Mani's professional experience includes interning at TINGE Beauty, a body makeup brand, as a content creation intern, working as a wholesale intern for Ferragamo, and as a business development intern at CLEAR this past summer.",
    mfms: true
  }
  ];