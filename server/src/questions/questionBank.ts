import { Question, Difficulty, Category } from '../types/index.js';

export const QUESTION_BANK: Question[] = [
  // ================= GENERAL KNOWLEDGE (20 questions) =================
  {
    id: 'gk-1',
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    category: 'General Knowledge',
    difficulty: 'easy',
    explanation: 'Mars is called the Red Planet because iron minerals in its soil oxidize (rust), giving it a reddish look.'
  },
  {
    id: 'gk-2',
    text: 'How many days are in a leap year?',
    options: ['364', '365', '366', '367'],
    correctAnswer: 2,
    category: 'General Knowledge',
    difficulty: 'easy',
    explanation: 'A leap year has 366 days, with an extra day added to February (February 29).'
  },
  {
    id: 'gk-3',
    text: 'What is the largest mammal currently living on Earth?',
    options: ['African Bush Elephant', 'Blue Whale', 'Colossal Squid', 'Giraffe'],
    correctAnswer: 1,
    category: 'General Knowledge',
    difficulty: 'easy',
    explanation: 'The Blue Whale can reach lengths of up to 30 meters and weigh up to 200 metric tons.'
  },
  {
    id: 'gk-4',
    text: 'Which country is home to the kangaroo?',
    options: ['New Zealand', 'South Africa', 'Australia', 'Brazil'],
    correctAnswer: 2,
    category: 'General Knowledge',
    difficulty: 'easy',
    explanation: 'Kangaroos are marsupials native to Australia.'
  },
  {
    id: 'gk-5',
    text: 'What is the currency of Japan?',
    options: ['Yuan', 'Won', 'Baht', 'Yen'],
    correctAnswer: 3,
    category: 'General Knowledge',
    difficulty: 'easy',
    explanation: 'The Japanese Yen (JPY) is the official currency of Japan.'
  },
  {
    id: 'gk-6',
    text: 'What is the color of an emerald gemstone?',
    options: ['Deep Red', 'Emerald Green', 'Royal Blue', 'Amber Yellow'],
    correctAnswer: 1,
    category: 'General Knowledge',
    difficulty: 'easy',
    explanation: 'Emeralds are a variety of the mineral beryl colored green by trace amounts of chromium and vanadium.'
  },
  {
    id: 'gk-7',
    text: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
    correctAnswer: 2,
    category: 'General Knowledge',
    difficulty: 'easy',
    explanation: 'Leonardo da Vinci painted the Mona Lisa in the early 16th century.'
  },
  {
    id: 'gk-8',
    text: 'Which chemical element has the symbol "Au"?',
    options: ['Silver', 'Gold', 'Argon', 'Copper'],
    correctAnswer: 1,
    category: 'General Knowledge',
    difficulty: 'medium',
    explanation: '"Au" comes from the Latin word "Aurum", which translates to shining dawn or gold.'
  },
  {
    id: 'gk-9',
    text: 'Which ocean is the largest by surface area?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 3,
    category: 'General Knowledge',
    difficulty: 'medium',
    explanation: 'The Pacific Ocean covers over 60 million square miles, larger than all of Earth\'s land area combined.'
  },
  {
    id: 'gk-10',
    text: 'In which city would you find the Colosseum?',
    options: ['Athens', 'Rome', 'Madrid', 'Paris'],
    correctAnswer: 1,
    category: 'General Knowledge',
    difficulty: 'medium',
    explanation: 'The Colosseum is an ancient amphitheater situated in the heart of Rome, Italy.'
  },
  {
    id: 'gk-11',
    text: 'What is the hardest natural substance known on Earth?',
    options: ['Titanium', 'Quartz', 'Diamond', 'Graphene'],
    correctAnswer: 2,
    category: 'General Knowledge',
    difficulty: 'medium',
    explanation: 'Diamond is the hardest naturally occurring substance, scoring 10 on the Mohs scale of mineral hardness.'
  },
  {
    id: 'gk-12',
    text: 'How many keys are on a standard acoustic piano?',
    options: ['76', '84', '88', '92'],
    correctAnswer: 2,
    category: 'General Knowledge',
    difficulty: 'medium',
    explanation: 'A standard piano features 88 keys: 52 white keys and 36 black keys.'
  },
  {
    id: 'gk-13',
    text: 'Which spice is the most expensive in the world by weight?',
    options: ['Saffron', 'Vanilla', 'Cardamom', 'Cinnamon'],
    correctAnswer: 0,
    category: 'General Knowledge',
    difficulty: 'medium',
    explanation: 'Saffron threads are harvested by hand from Crocus sativus flowers, requiring thousands of flowers for a few grams.'
  },
  {
    id: 'gk-14',
    text: 'Which author created the famous detective Sherlock Holmes?',
    options: ['Agatha Christie', 'Arthur Conan Doyle', 'Edgar Allan Poe', 'Charles Dickens'],
    correctAnswer: 1,
    category: 'General Knowledge',
    difficulty: 'medium',
    explanation: 'Sir Arthur Conan Doyle introduced Sherlock Holmes in his 1887 novel "A Study in Scarlet".'
  },
  {
    id: 'gk-15',
    text: 'What is the national animal of Scotland?',
    options: ['Red Stag', 'Golden Eagle', 'Unicorn', 'Loch Ness Monster'],
    correctAnswer: 2,
    category: 'General Knowledge',
    difficulty: 'hard',
    explanation: 'The unicorn has been a Scottish heraldic symbol since the 12th century, prized for its strength and purity.'
  },
  {
    id: 'gk-16',
    text: 'What is the only fruit with seeds on the outside?',
    options: ['Fig', 'Strawberry', 'Dragonfruit', 'Pomegranate'],
    correctAnswer: 1,
    category: 'General Knowledge',
    difficulty: 'hard',
    explanation: 'Strawberries bear their seed-like structures (achenes) on their exterior surface.'
  },
  {
    id: 'gk-17',
    text: 'What does the Latin phrase "Carpe Diem" literally translate to?',
    options: ['Seize the day', 'Remember death', 'Love conquers all', 'Fortune favors the bold'],
    correctAnswer: 0,
    category: 'General Knowledge',
    difficulty: 'hard',
    explanation: 'Originating from Horace\'s Odes, "Carpe Diem" literally translates to "pluck the day" or "seize the day".'
  },
  {
    id: 'gk-18',
    text: 'Which country drinks the most coffee per capita in the world?',
    options: ['Italy', 'Colombia', 'Finland', 'United States'],
    correctAnswer: 2,
    category: 'General Knowledge',
    difficulty: 'hard',
    explanation: 'Finland consistently ranks #1 in world coffee consumption per capita, averaging ~12 kg per person annually.'
  },
  {
    id: 'gk-19',
    text: 'What was the first toy ever advertised on television?',
    options: ['Barbie', 'Mr. Potato Head', 'LEGO Brick', 'G.I. Joe'],
    correctAnswer: 1,
    category: 'General Knowledge',
    difficulty: 'hard',
    explanation: 'Mr. Potato Head was advertised on TV in 1952, allowing kids to stick plastic face pieces into real potatoes!'
  },
  {
    id: 'gk-20',
    text: 'What is a group of flamingos called?',
    options: ['A Flock', 'A Flamboyance', 'A Kaleidoscope', 'A Prism'],
    correctAnswer: 1,
    category: 'General Knowledge',
    difficulty: 'hard',
    explanation: 'A collective noun for a gathering of flamingos is a "flamboyance".'
  },

  // ================= SCIENCE (20 questions) =================
  {
    id: 'sci-1',
    text: 'What is the primary gas found in Earth\'s atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
    correctAnswer: 2,
    category: 'Science',
    difficulty: 'easy',
    explanation: 'Nitrogen makes up approximately 78% of Earth\'s atmosphere, followed by oxygen at 21%.'
  },
  {
    id: 'sci-2',
    text: 'What is the chemical formula for water?',
    options: ['CO2', 'H2O', 'NaCl', 'CH4'],
    correctAnswer: 1,
    category: 'Science',
    difficulty: 'easy',
    explanation: 'Water consists of two hydrogen atoms bonded to one oxygen atom (H2O).'
  },
  {
    id: 'sci-3',
    text: 'Which organ in the human body pumps blood?',
    options: ['Lungs', 'Liver', 'Heart', 'Kidneys'],
    correctAnswer: 2,
    category: 'Science',
    difficulty: 'easy',
    explanation: 'The heart is a muscular organ that pumps oxygenated blood throughout the circulatory system.'
  },
  {
    id: 'sci-4',
    text: 'At what temperature does pure water freeze at standard sea level pressure?',
    options: ['0°C', '32°C', '100°C', '-10°C'],
    correctAnswer: 0,
    category: 'Science',
    difficulty: 'easy',
    explanation: 'Water freezes at 0 degrees Celsius (32 degrees Fahrenheit).'
  },
  {
    id: 'sci-5',
    text: 'What force keeps our feet firmly on the ground?',
    options: ['Centrifugal Force', 'Friction', 'Gravity', 'Magnetism'],
    correctAnswer: 2,
    category: 'Science',
    difficulty: 'easy',
    explanation: 'Earth\'s gravitational pull attracts objects toward its center of mass.'
  },
  {
    id: 'sci-6',
    text: 'What is the powerhouse organelle of eukaryotic cells?',
    options: ['Ribosome', 'Nucleus', 'Mitochondria', 'Endoplasmic Reticulum'],
    correctAnswer: 2,
    category: 'Science',
    difficulty: 'medium',
    explanation: 'Mitochondria generate most of the chemical energy needed by cells via adenosine triphosphate (ATP).'
  },
  {
    id: 'sci-7',
    text: 'Which particle in an atom carries a negative electrical charge?',
    options: ['Proton', 'Neutron', 'Electron', 'Positron'],
    correctAnswer: 2,
    category: 'Science',
    difficulty: 'medium',
    explanation: 'Electrons carry a negative charge (-1e), while protons carry a positive charge.'
  },
  {
    id: 'sci-8',
    text: 'What is the approximate speed of light in a vacuum?',
    options: ['300,000 km/s', '150,000 km/s', '1,000,000 km/s', '30,000 km/s'],
    correctAnswer: 0,
    category: 'Science',
    difficulty: 'medium',
    explanation: 'The speed of light in a vacuum is approximately 299,792 kilometers per second (about 300,000 km/s).'
  },
  {
    id: 'sci-9',
    text: 'Which vitamin is synthesized by the human body upon exposure to sunlight?',
    options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin B12'],
    correctAnswer: 2,
    category: 'Science',
    difficulty: 'medium',
    explanation: 'Ultraviolet B (UVB) rays trigger the synthesis of Vitamin D3 in human skin cells.'
  },
  {
    id: 'sci-10',
    text: 'How many chromosomes are present in a typical human somatic cell?',
    options: ['23', '46', '48', '52'],
    correctAnswer: 1,
    category: 'Science',
    difficulty: 'medium',
    explanation: 'Humans have 46 chromosomes in total, arranged as 23 pairs.'
  },
  {
    id: 'sci-11',
    text: 'Which planet in our solar system has the most moons?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correctAnswer: 1,
    category: 'Science',
    difficulty: 'medium',
    explanation: 'Saturn leads with over 140 confirmed natural satellites, overtaking Jupiter.'
  },
  {
    id: 'sci-12',
    text: 'What type of bond forms between two atoms when they share electron pairs?',
    options: ['Ionic Bond', 'Covalent Bond', 'Hydrogen Bond', 'Metallic Bond'],
    correctAnswer: 1,
    category: 'Science',
    difficulty: 'medium',
    explanation: 'A covalent bond involves the sharing of electron pairs between atoms.'
  },
  {
    id: 'sci-13',
    text: 'What is the absolute zero temperature in Celsius?',
    options: ['-100°C', '-273.15°C', '-459.67°C', '0°C'],
    correctAnswer: 1,
    category: 'Science',
    difficulty: 'hard',
    explanation: 'Absolute zero (0 Kelvin) is equal to -273.15 degrees Celsius, the point of zero thermal motion.'
  },
  {
    id: 'sci-14',
    text: 'Which radioactive element is named after the Polish scientist Marie Curie?',
    options: ['Polonium', 'Curium', 'Radium', 'Both Polonium and Curium'],
    correctAnswer: 3,
    category: 'Science',
    difficulty: 'hard',
    explanation: 'Polonium was named by Marie Curie after her homeland Poland, and Curium (Cm) was named after Marie & Pierre Curie.'
  },
  {
    id: 'sci-15',
    text: 'What fundamental force is responsible for radioactive decay?',
    options: ['Gravity', 'Electromagnetism', 'Strong Nuclear Force', 'Weak Nuclear Force'],
    correctAnswer: 3,
    category: 'Science',
    difficulty: 'hard',
    explanation: 'The weak nuclear force (weak interaction) governs beta decay and neutrino interactions.'
  },
  {
    id: 'sci-16',
    text: 'What is the most abundant element in the universe by mass?',
    options: ['Oxygen', 'Helium', 'Hydrogen', 'Carbon'],
    correctAnswer: 2,
    category: 'Science',
    difficulty: 'hard',
    explanation: 'Hydrogen accounts for roughly 75% of the baryonic mass of the universe.'
  },
  {
    id: 'sci-17',
    text: 'Which blood type is considered the universal red blood cell donor?',
    options: ['AB positive', 'O negative', 'O positive', 'A negative'],
    correctAnswer: 1,
    category: 'Science',
    difficulty: 'hard',
    explanation: 'O-negative blood lacks A, B, and Rh antigens, meaning it can be given to virtually any recipient in an emergency.'
  },
  {
    id: 'sci-18',
    text: 'What happens to light waves as they enter a denser medium at an angle?',
    options: ['Diffraction', 'Refraction', 'Total Internal Reflection', 'Polarization'],
    correctAnswer: 1,
    category: 'Science',
    difficulty: 'hard',
    explanation: 'Refraction is the bending of light caused by a change in speed when passing between media of different optical densities.'
  },
  {
    id: 'sci-19',
    text: 'What was the first cloned mammal created from an adult cell?',
    options: ['A dog named Snoopy', 'A sheep named Dolly', 'A cat named CC', 'A mouse named Cumulina'],
    correctAnswer: 1,
    category: 'Science',
    difficulty: 'medium',
    explanation: 'Dolly the sheep was cloned at the Roslin Institute in Scotland in 1996.'
  },
  {
    id: 'sci-20',
    text: 'What is the term for animals that maintain a constant internal body temperature regardless of the environment?',
    options: ['Ectothermic', 'Endothermic', 'Poikilothermic', 'Mesothermic'],
    correctAnswer: 1,
    category: 'Science',
    difficulty: 'hard',
    explanation: 'Endothermic animals (such as mammals and birds) regulate their internal body heat metabolically.'
  },

  // ================= TECHNOLOGY (20 questions) =================
  {
    id: 'tech-1',
    text: 'What does "HTTP" stand for in web addresses?',
    options: [
      'HyperText Transfer Protocol',
      'High-Speed Text Transmission Process',
      'Hyperlink Terminal Transfer Program',
      'Home Text Technology Platform'
    ],
    correctAnswer: 0,
    category: 'Technology',
    difficulty: 'easy',
    explanation: 'HTTP stands for HyperText Transfer Protocol, the underlying protocol used by the World Wide Web.'
  },
  {
    id: 'tech-2',
    text: 'Which company developed the Android mobile operating system?',
    options: ['Apple', 'Microsoft', 'Google', 'IBM'],
    correctAnswer: 2,
    category: 'Technology',
    difficulty: 'easy',
    explanation: 'Google acquired Android Inc. in 2005 and launched the first commercial version in 2008.'
  },
  {
    id: 'tech-3',
    text: 'What is the primary brain/processor of a computer called?',
    options: ['GPU', 'RAM', 'CPU', 'SSD'],
    correctAnswer: 2,
    category: 'Technology',
    difficulty: 'easy',
    explanation: 'The Central Processing Unit (CPU) executes computer instructions and processes data.'
  },
  {
    id: 'tech-4',
    text: 'What does the abbreviation "AI" commonly stand for?',
    options: ['Automated Interface', 'Artificial Intelligence', 'Applied Integration', 'Algorithmic Index'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'easy',
    explanation: 'AI stands for Artificial Intelligence.'
  },
  {
    id: 'tech-5',
    text: 'Which key combination is universally used to copy highlighted text in Windows?',
    options: ['Ctrl + V', 'Ctrl + C', 'Ctrl + X', 'Ctrl + Z'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'easy',
    explanation: 'Ctrl + C copies, Ctrl + X cuts, and Ctrl + V pastes.'
  },
  {
    id: 'tech-6',
    text: 'Which programming language is predominantly used to style web pages?',
    options: ['HTML', 'CSS', 'Python', 'C++'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'easy',
    explanation: 'Cascading Style Sheets (CSS) describe how HTML elements should be presented visually.'
  },
  {
    id: 'tech-7',
    text: 'In database systems, what does "SQL" stand for?',
    options: [
      'Simple Query Logic',
      'Structured Query Language',
      'Sequential Question Locator',
      'Standard Quantum Language'
    ],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'medium',
    explanation: 'SQL stands for Structured Query Language, designed for managing relational databases.'
  },
  {
    id: 'tech-8',
    text: 'Who created the Linux kernel?',
    options: ['Steve Jobs', 'Linus Torvalds', 'Bill Gates', 'Richard Stallman'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'medium',
    explanation: 'Linus Torvalds released the Linux operating system kernel in September 1991.'
  },
  {
    id: 'tech-9',
    text: 'What port does default secure HTTPS web traffic use?',
    options: ['80', '8080', '443', '22'],
    correctAnswer: 2,
    category: 'Technology',
    difficulty: 'medium',
    explanation: 'Port 443 is the standard TCP port reserved for HTTPS encrypted traffic (Port 80 is for unencrypted HTTP).'
  },
  {
    id: 'tech-10',
    text: 'Which data structure follows the "First In, First Out" (FIFO) principle?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'medium',
    explanation: 'A Queue operates under FIFO (First In, First Out), like people standing in line.'
  },
  {
    id: 'tech-11',
    text: 'In computer networking, what does "DNS" resolve?',
    options: ['Files to folders', 'Domain names to IP addresses', 'Passwords to hashes', 'MAC addresses to URLs'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'medium',
    explanation: 'The Domain Name System (DNS) translates human-readable domain names (like google.com) into numerical IP addresses.'
  },
  {
    id: 'tech-12',
    text: 'What protocol provides full-duplex, bidirectional real-time communication over a single TCP connection?',
    options: ['REST', 'WebSocket', 'FTP', 'SMTP'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'medium',
    explanation: 'WebSocket provides persistent, low-overhead two-way communication between client and server, ideal for multiplayer games.'
  },
  {
    id: 'tech-13',
    text: 'What is the time complexity of searching for an element in a balanced binary search tree?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 2,
    category: 'Technology',
    difficulty: 'hard',
    explanation: 'In a balanced BST, each comparison cuts the search space in half, resulting in O(log n) logarithmic time complexity.'
  },
  {
    id: 'tech-14',
    text: 'In cryptography, what does RSA stand for?',
    options: [
      'Rivest–Shamir–Adleman',
      'Random Symmetric Algorithm',
      'Recursive Security Architecture',
      'Robust Secure Authentication'
    ],
    correctAnswer: 0,
    category: 'Technology',
    difficulty: 'hard',
    explanation: 'RSA is named after Ron Rivest, Adi Shamir, and Leonard Adleman, who publicly described the algorithm in 1977.'
  },
  {
    id: 'tech-15',
    text: 'Which consensus mechanism does the Bitcoin blockchain network utilize?',
    options: ['Proof of Stake', 'Proof of Authority', 'Proof of Work', 'Proof of Space'],
    correctAnswer: 2,
    category: 'Technology',
    difficulty: 'hard',
    explanation: 'Bitcoin uses the Proof of Work (PoW) consensus mechanism with SHA-256 cryptographic hashing.'
  },
  {
    id: 'tech-16',
    text: 'What was the name of the first electronic general-purpose digital computer completed in 1945?',
    options: ['UNIVAC I', 'ENIAC', 'Colossus', 'Analytical Engine'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'hard',
    explanation: 'ENIAC (Electronic Numerical Integrator and Computer) was built at the University of Pennsylvania.'
  },
  {
    id: 'tech-17',
    text: 'In Git version control, which command creates a new branch and switches directly to it?',
    options: ['git branch -new', 'git checkout -b', 'git commit -b', 'git switch -m'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'medium',
    explanation: '`git checkout -b <branch>` or `git switch -c <branch>` creates and checks out a new branch.'
  },
  {
    id: 'tech-18',
    text: 'What does the "ACID" acronym stand for in database transaction management?',
    options: [
      'Atomicity, Consistency, Isolation, Durability',
      'Accuracy, Concurrency, Integrity, Delivery',
      'Asynchronous, Cached, Indexed, Distributed',
      'Array, Collection, Item, Dataset'
    ],
    correctAnswer: 0,
    category: 'Technology',
    difficulty: 'hard',
    explanation: 'ACID ensures reliable database transactions: Atomicity, Consistency, Isolation, and Durability.'
  },
  {
    id: 'tech-19',
    text: 'Which JavaScript runtime was created by Ryan Dahl in 2009?',
    options: ['Bun', 'Deno', 'Node.js', 'V8 Engine'],
    correctAnswer: 2,
    category: 'Technology',
    difficulty: 'medium',
    explanation: 'Ryan Dahl created Node.js using Chrome\'s V8 engine to bring asynchronous JavaScript execution to the server.'
  },
  {
    id: 'tech-20',
    text: 'What does the "T" stand for in the GPT generative AI model acronym?',
    options: ['Translation', 'Transformer', 'Telecommunication', 'Turing'],
    correctAnswer: 1,
    category: 'Technology',
    difficulty: 'hard',
    explanation: 'GPT stands for Generative Pre-trained Transformer, based on the self-attention transformer architecture introduced in 2017.'
  },

  // ================= HISTORY (20 questions) =================
  {
    id: 'hist-1',
    text: 'Who was the first President of the United States?',
    options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
    correctAnswer: 2,
    category: 'History',
    difficulty: 'easy',
    explanation: 'George Washington served as the first U.S. President from 1789 to 1797.'
  },
  {
    id: 'hist-2',
    text: 'In which year did the Titanic sink after striking an iceberg?',
    options: ['1905', '1912', '1920', '1898'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'easy',
    explanation: 'The RMS Titanic struck an iceberg and sank on April 15, 1912.'
  },
  {
    id: 'hist-3',
    text: 'Which ancient civilization built the Great Pyramids of Giza?',
    options: ['Ancient Rome', 'Ancient Egypt', 'Mesopotamia', 'Ancient Greece'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'easy',
    explanation: 'The pyramids were constructed during the Old Kingdom period of Ancient Egypt.'
  },
  {
    id: 'hist-4',
    text: 'In which country did the Industrial Revolution begin?',
    options: ['France', 'Germany', 'United States', 'Great Britain'],
    correctAnswer: 3,
    category: 'History',
    difficulty: 'easy',
    explanation: 'The Industrial Revolution began in Great Britain in the mid-18th century.'
  },
  {
    id: 'hist-5',
    text: 'Who was the famous queen of Ancient Egypt associated with Julius Caesar and Mark Antony?',
    options: ['Nefertiti', 'Hatshepsut', 'Cleopatra VII', 'Sobekneferu'],
    correctAnswer: 2,
    category: 'History',
    difficulty: 'easy',
    explanation: 'Cleopatra VII Philopator was the last active ruler of the Ptolemaic Kingdom of Egypt.'
  },
  {
    id: 'hist-6',
    text: 'In which year did World War II officially end?',
    options: ['1943', '1944', '1945', '1948'],
    correctAnswer: 2,
    category: 'History',
    difficulty: 'medium',
    explanation: 'World War II concluded in 1945 following the unconditional surrender of the Axis powers.'
  },
  {
    id: 'hist-7',
    text: 'Which European explorer reached the Americas in 1492?',
    options: ['Vasco da Gama', 'Christopher Columbus', 'Ferdinand Magellan', 'Marco Polo'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'medium',
    explanation: 'Christopher Columbus made landfall in the Bahamas archipelago in October 1492.'
  },
  {
    id: 'hist-8',
    text: 'Who wrote the ancient Indian treatise on statecraft known as the Arthashastra?',
    options: ['Chanakya (Kautilya)', 'Ashoka the Great', 'Aryabhata', 'Kalidasa'],
    correctAnswer: 0,
    category: 'History',
    difficulty: 'medium',
    explanation: 'Chanakya (also known as Kautilya or Vishnugupta) composed the Arthashastra around the 3rd century BCE.'
  },
  {
    id: 'hist-9',
    text: 'What wall dividing an iconic European city fell in November 1989?',
    options: ['Hadrian\'s Wall', 'The Berlin Wall', 'The Wall of Dubrovnik', 'The Western Wall'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'medium',
    explanation: 'The fall of the Berlin Wall in November 1989 marked the pivotal collapse of the Iron Curtain.'
  },
  {
    id: 'hist-10',
    text: 'Who delivered the renowned "I Have a Dream" speech in Washington, D.C. in 1963?',
    options: ['Malcolm X', 'Martin Luther King Jr.', 'John F. Kennedy', 'Nelson Mandela'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'medium',
    explanation: 'Dr. Martin Luther King Jr. delivered the speech during the March on Washington for Jobs and Freedom.'
  },
  {
    id: 'hist-11',
    text: 'The Magna Carta was signed by King John of England in what year?',
    options: ['1066', '1215', '1415', '1776'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'medium',
    explanation: 'King John granted the Magna Carta at Runnymede in June 1215.'
  },
  {
    id: 'hist-12',
    text: 'Which empire was ruled by Genghis Khan?',
    options: ['Ottoman Empire', 'Mongol Empire', 'Persian Empire', 'Mughal Empire'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'medium',
    explanation: 'Genghis Khan unified the nomadic tribes to establish the Mongol Empire in 1206.'
  },
  {
    id: 'hist-13',
    text: 'Which Russian Tsar founded the city of Saint Petersburg in 1703?',
    options: ['Ivan the Terrible', 'Peter the Great', 'Nicholas II', 'Alexander I'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'hard',
    explanation: 'Peter the Great founded Saint Petersburg as Russia\'s "window to Europe".'
  },
  {
    id: 'hist-14',
    text: 'What battle in 1066 established Norman rule in England?',
    options: ['Battle of Agincourt', 'Battle of Hastings', 'Battle of Waterloo', 'Battle of Bosworth'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'hard',
    explanation: 'William the Conqueror defeated King Harold Godwinson at the Battle of Hastings on October 14, 1066.'
  },
  {
    id: 'hist-15',
    text: 'Which Roman Emperor legalized Christianity throughout the empire with the Edict of Milan?',
    options: ['Nero', 'Augustus', 'Constantine the Great', 'Marcus Aurelius'],
    correctAnswer: 2,
    category: 'History',
    difficulty: 'hard',
    explanation: 'Emperor Constantine I issued the Edict of Milan in 313 CE, granting religious tolerance to Christianity.'
  },
  {
    id: 'hist-16',
    text: 'In what year did the French Revolution officially begin with the storming of the Bastille?',
    options: ['1776', '1789', '1799', '1804'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'hard',
    explanation: 'The storming of the Bastille fortress occurred on July 14, 1789.'
  },
  {
    id: 'hist-17',
    text: 'Who was the first emperor of a unified China and creator of the Terracotta Army?',
    options: ['Qin Shi Huang', 'Han Wudi', 'Kublai Khan', 'Sun Yat-sen'],
    correctAnswer: 0,
    category: 'History',
    difficulty: 'hard',
    explanation: 'Qin Shi Huang unified the warring states in 221 BCE and became the first Emperor of China.'
  },
  {
    id: 'hist-18',
    text: 'What was the code name of the allied airborne and amphibious invasion of Normandy on D-Day (1944)?',
    options: ['Operation Barbarossa', 'Operation Overlord', 'Operation Market Garden', 'Operation Torch'],
    correctAnswer: 1,
    category: 'History',
    difficulty: 'hard',
    explanation: 'Operation Overlord commenced on June 6, 1944, across the beaches of Normandy.'
  },
  {
    id: 'hist-19',
    text: 'Which Mesoamerican civilization was conquered by Hernán Cortés in 1521?',
    options: ['Inca', 'Maya', 'Aztec', 'Olmec'],
    correctAnswer: 2,
    category: 'History',
    difficulty: 'hard',
    explanation: 'Hernán Cortés led the Spanish conquest of the Aztec Empire and its capital Tenochtitlan.'
  },
  {
    id: 'hist-20',
    text: 'Which ancient Greek philosopher was sentenced to death by drinking hemlock in 399 BCE?',
    options: ['Plato', 'Aristotle', 'Socrates', 'Pythagoras'],
    correctAnswer: 2,
    category: 'History',
    difficulty: 'hard',
    explanation: 'Socrates was convicted in Athens of impiety and corrupting the youth, choosing to drink poisonous hemlock.'
  },

  // ================= GEOGRAPHY (20 questions) =================
  {
    id: 'geo-1',
    text: 'What is the capital city of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'easy',
    explanation: 'Paris is the capital and most populous city of France.'
  },
  {
    id: 'geo-2',
    text: 'Which continent is the Sahara Desert located on?',
    options: ['Asia', 'South America', 'Africa', 'Australia'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'easy',
    explanation: 'The Sahara spans across Northern Africa, covering over 9 million square kilometers.'
  },
  {
    id: 'geo-3',
    text: 'What is the tallest mountain in the world above sea level?',
    options: ['K2', 'Mount Kilimanjaro', 'Mount Everest', 'Denali'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'easy',
    explanation: 'Mount Everest reaches 8,848.86 meters (29,031.7 ft) in the Himalayas.'
  },
  {
    id: 'geo-4',
    text: 'Which river is widely recognized as the longest in the world?',
    options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
    correctAnswer: 1,
    category: 'Geography',
    difficulty: 'easy',
    explanation: 'The Nile River in northeastern Africa flows approximately 6,650 km (4,132 miles).'
  },
  {
    id: 'geo-5',
    text: 'How many continents are there on Earth?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'easy',
    explanation: 'The 7 continents are Asia, Africa, North America, South America, Antarctica, Europe, and Australia.'
  },
  {
    id: 'geo-6',
    text: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'medium',
    explanation: 'Canberra was chosen as the federal capital of Australia in 1908 as a compromise between Sydney and Melbourne.'
  },
  {
    id: 'geo-7',
    text: 'Which country has the longest coastline in the world?',
    options: ['Russia', 'Canada', 'Indonesia', 'Chile'],
    correctAnswer: 1,
    category: 'Geography',
    difficulty: 'medium',
    explanation: 'Canada holds the world\'s longest coastline at over 202,080 kilometers (125,567 miles).'
  },
  {
    id: 'geo-8',
    text: 'Through which major canal can ships pass between the Atlantic and Pacific oceans?',
    options: ['Suez Canal', 'Panama Canal', 'Kiel Canal', 'Erie Canal'],
    correctAnswer: 1,
    category: 'Geography',
    difficulty: 'medium',
    explanation: 'The Panama Canal cuts across the Isthmus of Panama, dramatically shortening maritime voyages.'
  },
  {
    id: 'geo-9',
    text: 'What is the smallest independent sovereign state in the world by land area?',
    options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'medium',
    explanation: 'Vatican City covers just 0.49 square kilometers (121 acres) completely surrounded by Rome, Italy.'
  },
  {
    id: 'geo-10',
    text: 'In which mountain range would you find the Matterhorn peak?',
    options: ['The Pyrenees', 'The Alps', 'The Andes', 'The Carpathians'],
    correctAnswer: 1,
    category: 'Geography',
    difficulty: 'medium',
    explanation: 'The Matterhorn is a striking pyramid-shaped peak situated on the border between Switzerland and Italy in the Alps.'
  },
  {
    id: 'geo-11',
    text: 'Which two countries share the longest international land border?',
    options: ['Russia and China', 'United States and Canada', 'Argentina and Chile', 'India and Bangladesh'],
    correctAnswer: 1,
    category: 'Geography',
    difficulty: 'medium',
    explanation: 'The border between Canada and the United States spans 8,891 kilometers (5,525 miles).'
  },
  {
    id: 'geo-12',
    text: 'What is the largest island in the world that is not a continent?',
    options: ['Madagascar', 'Greenland', 'Borneo', 'New Guinea'],
    correctAnswer: 1,
    category: 'Geography',
    difficulty: 'medium',
    explanation: 'Greenland has a total area of over 2.16 million square kilometers, making it the world\'s largest island.'
  },
  {
    id: 'geo-13',
    text: 'Which country spans 11 standard time zones?',
    options: ['Canada', 'China', 'Russia', 'United States'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'hard',
    explanation: 'Russia stretches across Eurasia from Kaliningrad to Kamchatka, covering 11 contiguous time zones.'
  },
  {
    id: 'geo-14',
    text: 'What is the driest non-polar desert on Earth?',
    options: ['Gobi Desert', 'Atacama Desert', 'Mojave Desert', 'Kalahari Desert'],
    correctAnswer: 1,
    category: 'Geography',
    difficulty: 'hard',
    explanation: 'The Atacama Desert in northern Chile receives less than 1 millimeter of precipitation per year in some areas.'
  },
  {
    id: 'geo-15',
    text: 'What is the deepest lake in the world containing 20% of Earth\'s unfrozen surface fresh water?',
    options: ['Lake Superior', 'Lake Victoria', 'Lake Baikal', 'Lake Tanganyika'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'hard',
    explanation: 'Lake Baikal in Siberia, Russia reaches a maximum depth of 1,642 meters (5,387 feet).'
  },
  {
    id: 'geo-16',
    text: 'Which capital city sits at the highest altitude above sea level in the world?',
    options: ['Quito, Ecuador', 'La Paz, Bolivia', 'Bogotá, Colombia', 'Addis Ababa, Ethiopia'],
    correctAnswer: 1,
    category: 'Geography',
    difficulty: 'hard',
    explanation: 'La Paz, Bolivia (the administrative capital) sits at an average altitude of approximately 3,640 meters (11,942 ft).'
  },
  {
    id: 'geo-17',
    text: 'What body of water separates the United Kingdom from mainland France?',
    options: ['Bering Strait', 'English Channel', 'Strait of Gibraltar', 'Bosphorus'],
    correctAnswer: 1,
    category: 'Geography',
    difficulty: 'easy',
    explanation: 'The English Channel (La Manche) links the North Sea to the Atlantic Ocean between England and France.'
  },
  {
    id: 'geo-18',
    text: 'Which African nation has three designated capital cities (Pretoria, Cape Town, and Bloemfontein)?',
    options: ['Nigeria', 'Kenya', 'South Africa', 'Egypt'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'hard',
    explanation: 'South Africa splits its government among Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial).'
  },
  {
    id: 'geo-19',
    text: 'Which island nation is located nearest to the horn of Eastern Africa in the Indian Ocean?',
    options: ['Seychelles', 'Mauritius', 'Socotra (Yemen)', 'Madagascar'],
    correctAnswer: 2,
    category: 'Geography',
    difficulty: 'hard',
    explanation: 'Socotra is an archipelago officially belonging to Yemen, situated 240 kilometers east of the Horn of Africa.'
  },
  {
    id: 'geo-20',
    text: 'What is the only sea without any land boundaries, surrounded completely by ocean currents?',
    options: ['Sargasso Sea', 'Coral Sea', 'Baltic Sea', 'Weddell Sea'],
    correctAnswer: 0,
    category: 'Geography',
    difficulty: 'hard',
    explanation: 'The Sargasso Sea is bounded only by four ocean currents forming the North Atlantic Gyre.'
  },

  // ================= SPORTS (20 questions) =================
  {
    id: 'sport-1',
    text: 'How many players are on the pitch for one team in a standard soccer (association football) match?',
    options: ['9', '10', '11', '12'],
    correctAnswer: 2,
    category: 'Sports',
    difficulty: 'easy',
    explanation: 'Each soccer team fields 11 players including 1 goalkeeper.'
  },
  {
    id: 'sport-2',
    text: 'In which sport would you execute a slam dunk?',
    options: ['Volleyball', 'Tennis', 'Basketball', 'Baseball'],
    correctAnswer: 2,
    category: 'Sports',
    difficulty: 'easy',
    explanation: 'A slam dunk is a high-percentage shot in basketball where a player drives the ball directly into the hoop.'
  },
  {
    id: 'sport-3',
    text: 'How many holes are played in a standard full round of golf?',
    options: ['9', '12', '18', '24'],
    correctAnswer: 2,
    category: 'Sports',
    difficulty: 'easy',
    explanation: 'A regulation round of golf consists of 18 holes.'
  },
  {
    id: 'sport-4',
    text: 'What color card does a referee show to immediately eject a player in soccer?',
    options: ['Yellow Card', 'Red Card', 'Black Card', 'Blue Card'],
    correctAnswer: 1,
    category: 'Sports',
    difficulty: 'easy',
    explanation: 'A red card indicates a serious foul and requires immediate ejection from the pitch.'
  },
  {
    id: 'sport-5',
    text: 'How many points is a touchdown worth in American football?',
    options: ['3', '6', '7', '8'],
    correctAnswer: 1,
    category: 'Sports',
    difficulty: 'easy',
    explanation: 'A touchdown awards 6 points, with an opportunity for an extra point or two-point conversion.'
  },
  {
    id: 'sport-6',
    text: 'Which country has won the FIFA World Cup the most times?',
    options: ['Germany', 'Italy', 'Argentina', 'Brazil'],
    correctAnswer: 3,
    category: 'Sports',
    difficulty: 'medium',
    explanation: 'Brazil holds the record with 5 FIFA World Cup titles (1958, 1962, 1970, 1994, 2002).'
  },
  {
    id: 'sport-7',
    text: 'What is the distance of an official modern marathon race?',
    options: ['21.1 km (13.1 miles)', '42.195 km (26.2 miles)', '50 km (31 miles)', '35 km (21.7 miles)'],
    correctAnswer: 1,
    category: 'Sports',
    difficulty: 'medium',
    explanation: 'The standard marathon distance is 42.195 kilometers (26 miles 385 yards), standardized at the 1908 London Olympics.'
  },
  {
    id: 'sport-8',
    text: 'Which tennis Grand Slam tournament is played on traditional grass courts?',
    options: ['Australian Open', 'Roland Garros (French Open)', 'Wimbledon', 'US Open'],
    correctAnswer: 2,
    category: 'Sports',
    difficulty: 'medium',
    explanation: 'Wimbledon is held at the All England Club in London and is the only Grand Slam played on outdoor grass courts.'
  },
  {
    id: 'sport-9',
    text: 'Who holds the world record for the 100-meter sprint at 9.58 seconds?',
    options: ['Tyson Gay', 'Carl Lewis', 'Usain Bolt', 'Yohan Blake'],
    correctAnswer: 2,
    category: 'Sports',
    difficulty: 'medium',
    explanation: 'Jamaican sprinter Usain Bolt set the blistering 9.58s record at the 2009 World Championships in Berlin.'
  },
  {
    id: 'sport-10',
    text: 'What is the term in bowling when you roll three strikes in a row?',
    options: ['Triple Play', 'A Turkey', 'A Hat-Trick', 'A Perfect Split'],
    correctAnswer: 1,
    category: 'Sports',
    difficulty: 'medium',
    explanation: 'Three consecutive strikes in ten-pin bowling is traditionally called a "turkey".'
  },
  {
    id: 'sport-11',
    text: 'In cricket, how many balls constitute one regulation "over"?',
    options: ['4', '6', '8', '10'],
    correctAnswer: 1,
    category: 'Sports',
    difficulty: 'medium',
    explanation: 'A bowler delivers 6 legal balls to complete one standard over.'
  },
  {
    id: 'sport-12',
    text: 'Which Formula 1 racing driver holds a joint-record 7 World Drivers\' Championships with Michael Schumacher?',
    options: ['Max Verstappen', 'Lewis Hamilton', 'Sebastian Vettel', 'Fernando Alonso'],
    correctAnswer: 1,
    category: 'Sports',
    difficulty: 'medium',
    explanation: 'Lewis Hamilton and Michael Schumacher share the historic record with 7 World Championships each.'
  },
  {
    id: 'sport-13',
    text: 'In Olympic boxing, what is the weight limit for the Men\'s Heavyweight division?',
    options: ['81 to 91 kg', '92+ kg', '75 to 81 kg', '100+ kg'],
    correctAnswer: 0,
    category: 'Sports',
    difficulty: 'hard',
    explanation: 'Olympic Heavyweight covers 81 to 91 kg (92+ kg is Super Heavyweight).'
  },
  {
    id: 'sport-14',
    text: 'Which swimmer has won the most Olympic gold medals in history (23 golds)?',
    options: ['Ian Thorpe', 'Michael Phelps', 'Mark Spitz', 'Caeleb Dressel'],
    correctAnswer: 1,
    category: 'Sports',
    difficulty: 'hard',
    explanation: 'American swimmer Michael Phelps holds the all-time record with 28 total Olympic medals, 23 of them gold.'
  },
  {
    id: 'sport-15',
    text: 'In chess, what special move allows the king and rook to move simultaneously?',
    options: ['En Passant', 'Castling', 'Promotion', 'Fianchetto'],
    correctAnswer: 1,
    category: 'Sports',
    difficulty: 'hard',
    explanation: 'Castling allows the king to move two squares toward a rook on the first rank while the rook jumps over it.'
  },
  {
    id: 'sport-16',
    text: 'What is the diameter of an official NBA basketball hoop rim in inches?',
    options: ['16 inches', '18 inches', '20 inches', '22 inches'],
    correctAnswer: 1,
    category: 'Sports',
    difficulty: 'hard',
    explanation: 'A regulation basketball rim has an inside diameter of exactly 18 inches (45.72 cm).'
  },
  {
    id: 'sport-17',
    text: 'Which nation hosted the first modern Olympic Games in 1896?',
    options: ['France', 'United Kingdom', 'Greece', 'United States'],
    correctAnswer: 2,
    category: 'Sports',
    difficulty: 'hard',
    explanation: 'The inaugural modern Olympics took place in Athens, Greece, in the Panathenaic Stadium in 1896.'
  },
  {
    id: 'sport-18',
    text: 'What team won the inaugural Premier League football title in the 1992-1993 season?',
    options: ['Arsenal', 'Liverpool', 'Manchester United', 'Blackburn Rovers'],
    correctAnswer: 2,
    category: 'Sports',
    difficulty: 'hard',
    explanation: 'Sir Alex Ferguson led Manchester United to claim the first Premier League championship in 1992-93.'
  },
  {
    id: 'sport-19',
    text: 'In badminton, what is the object hit back and forth across the net called?',
    options: ['Birdie or Shuttlecock', 'Quoit', 'Puck', 'Pelota'],
    correctAnswer: 0,
    category: 'Sports',
    difficulty: 'easy',
    explanation: 'The projectile in badminton is known as a shuttlecock (or birdie).'
  },
  {
    id: 'sport-20',
    text: 'How long is an Olympic swimming pool in meters?',
    options: ['25 meters', '50 meters', '75 meters', '100 meters'],
    correctAnswer: 1,
    category: 'Sports',
    difficulty: 'easy',
    explanation: 'An Olympic-size competition swimming pool is 50 meters (164.0 feet) long.'
  }
];

export class QuestionService {
  private static questions = [...QUESTION_BANK];

  public static getCategories(): Category[] {
    return [
      'All',
      'General Knowledge',
      'Science',
      'Technology',
      'Sports',
      'History',
      'Geography'
    ];
  }

  public static getQuestions(
    count: number,
    category: Category = 'All',
    difficulty: 'all' | Difficulty = 'all'
  ): Question[] {
    let pool = [...this.questions];

    if (category !== 'All') {
      pool = pool.filter((q) => q.category.toLowerCase() === category.toLowerCase());
    }

    if (difficulty !== 'all') {
      pool = pool.filter((q) => q.difficulty === difficulty);
    }

    // If filtered pool has fewer questions than requested, fall back to adding questions from other categories
    if (pool.length < count) {
      const remainingNeeded = count - pool.length;
      const otherQuestions = this.questions
        .filter((q) => !pool.some((p) => p.id === q.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, remainingNeeded);
      pool = [...pool, ...otherQuestions];
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}
