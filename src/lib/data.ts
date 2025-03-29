
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  featured?: boolean;
}

export const breakingHeadlines = [
  "Tech giant announces revolutionary AI breakthrough",
  "Global leaders meet to discuss climate change solutions",
  "Major economic reform bill passes with bipartisan support",
  "Scientists discover promising treatment for rare disease",
  "Space mission successfully lands on distant moon"
];

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "AI Revolution: How Machine Learning is Transforming Healthcare",
    summary: "New AI algorithms are helping doctors diagnose diseases with unprecedented accuracy, potentially saving millions of lives.",
    imageUrl: "https://picsum.photos/seed/ai-health/1200/800",
    category: "Technology",
    date: "June 12, 2023",
    content: `
      <p>Artificial intelligence is fundamentally changing how healthcare is delivered across the globe. From early disease detection to personalized treatment plans, machine learning algorithms are enhancing the capabilities of medical professionals in ways that were once thought impossible.</p>
      
      <p>Recent studies show that AI systems can now detect certain cancers from imaging data with accuracy rates exceeding those of experienced radiologists. This breakthrough comes at a crucial time, as healthcare systems worldwide struggle with physician shortages and rising costs.</p>
      
      <h3>Real-World Applications</h3>
      
      <p>At Memorial Hospital in Boston, an AI system recently identified a rare form of cancer that had been missed in initial screenings. "The patient would likely have received a misdiagnosis if not for the AI analysis," noted Dr. Sarah Chen, the attending physician.</p>
      
      <p>Beyond diagnostics, artificial intelligence is being deployed for:</p>
      
      <ul>
        <li>Predicting patient deterioration before obvious symptoms appear</li>
        <li>Optimizing hospital workflows and resource allocation</li>
        <li>Accelerating pharmaceutical research and drug discovery</li>
        <li>Providing personalized treatment recommendations based on genetic profiles</li>
      </ul>
      
      <h3>Challenges Remain</h3>
      
      <p>Despite the promise, significant hurdles exist in the widespread implementation of AI in healthcare. Data privacy concerns, algorithm bias, and questions about regulatory oversight all need to be addressed before these technologies reach their full potential.</p>
      
      <p>"We need to ensure these systems are transparent, fair, and designed with patient welfare as the primary consideration," says medical ethicist Dr. James Morton.</p>
      
      <p>As researchers continue to refine these technologies, one thing is clear: the intersection of artificial intelligence and medicine represents one of the most promising frontiers in healthcare innovation.</p>
    `,
    likes: 1243,
    comments: 89,
    featured: true
  },
  {
    id: "2",
    title: "Climate Summit Reaches Historic Agreement on Emissions",
    summary: "World leaders agree to ambitious carbon reduction targets in unprecedented global climate accord.",
    imageUrl: "https://picsum.photos/seed/climate/1200/800",
    category: "Environment",
    date: "June 10, 2023",
    content: `
      <p>In a landmark decision that many are calling the most significant climate agreement since the Paris Accord, representatives from 195 countries have committed to drastically reducing carbon emissions over the next decade.</p>
      
      <p>The agreement, reached after marathon negotiations at the International Climate Summit, establishes legally binding targets that aim to limit global warming to 1.5 degrees Celsius above pre-industrial levels.</p>
      
      <h3>Key Provisions</h3>
      
      <p>The new framework includes several groundbreaking provisions:</p>
      
      <ul>
        <li>A 60% reduction in carbon emissions by 2035 (compared to 2010 levels)</li>
        <li>Establishment of a $100 billion annual fund to help developing nations transition to clean energy</li>
        <li>Phasing out of coal power in developed nations by 2030</li>
        <li>Creation of an international carbon pricing mechanism</li>
      </ul>
      
      <p>"This agreement represents a turning point in humanity's response to the climate crisis," said UN Secretary-General António Torres. "For the first time, we have truly global cooperation with concrete, measurable commitments."</p>
      
      <h3>Industry Response</h3>
      
      <p>The private sector has shown mixed reactions to the new agreement. Many renewable energy companies saw their stock prices surge, while traditional fossil fuel corporations face uncertain futures.</p>
      
      <p>"We've been preparing for this transition for years," said Elena Wang, CEO of SolarFuture, one of the world's largest solar panel manufacturers. "The clarity this agreement provides will accelerate investment in clean technology."</p>
      
      <p>Implementation begins immediately, with the first progress reviews scheduled for 2025. Experts caution that while the agreement is promising, the real challenge lies in following through on these ambitious commitments.</p>
    `,
    likes: 856,
    comments: 132
  },
  {
    id: "3",
    title: "Global Economy Shows Signs of Recovery Despite Inflation Concerns",
    summary: "Economic indicators point to strong growth as world emerges from pandemic, but inflation remains a significant worry.",
    imageUrl: "https://picsum.photos/seed/economy/1200/800",
    category: "Business",
    date: "June 8, 2023",
    content: `
      <p>The global economy is exhibiting robust signs of recovery, with GDP growth exceeding expectations across most major economies. This resurgence comes as vaccination rates increase and pandemic restrictions ease, allowing businesses to reopen and consumer spending to rebound.</p>
      
      <p>According to the International Monetary Fund, global growth is projected to reach 6.1% this year, the strongest post-recession pace in decades. Employment numbers are also improving, with job creation accelerating in the service sector particularly.</p>
      
      <h3>Inflation Concerns</h3>
      
      <p>Despite the positive trajectory, economists express growing concern about inflation, which has reached multi-decade highs in several countries. Consumer prices in the United States rose 5.4% year-over-year in the latest report, while the European Union recorded a 3.2% increase.</p>
      
      <p>"We're monitoring the inflation situation very carefully," said Federal Reserve Chair Janet Powell. "Some price increases were expected as demand recovers, but we're watching for signs that these pressures might become persistent."</p>
      
      <p>Central banks face a delicate balancing act: supporting continued economic recovery while preventing overheating that could lead to sustained inflation. Several have signaled potential interest rate increases later this year.</p>
      
      <h3>Uneven Recovery</h3>
      
      <p>The economic rebound remains uneven across sectors and regions. While technology, healthcare, and consumer goods have flourished, tourism and commercial real estate continue to struggle. Similarly, emerging economies with lower vaccination rates lag behind their developed counterparts.</p>
      
      <p>"This recovery is K-shaped," explained economist Miguel Rodriguez. "Some industries and workers are doing better than ever, while others face continued hardship. Addressing this divergence will be critical for sustainable growth."</p>
      
      <p>As the recovery progresses, policymakers are increasingly focusing on building resilience against future shocks while navigating the immediate challenges of inflation and supply chain disruptions.</p>
    `,
    likes: 432,
    comments: 67
  },
  {
    id: "4",
    title: "Revolutionary Space Telescope Captures First Images of Distant Exoplanets",
    summary: "Scientists reveal groundbreaking images showing atmospheric composition of planets outside our solar system.",
    imageUrl: "https://picsum.photos/seed/space/1200/800",
    category: "Science",
    date: "June 5, 2023",
    content: `
      <p>In a milestone for astronomy, the Advanced Planetary Imaging Telescope (APIT) has captured the first direct images showing the atmospheric composition of multiple exoplanets. These groundbreaking observations provide unprecedented insights into worlds beyond our solar system.</p>
      
      <p>The $4.2 billion telescope, launched last year, utilizes revolutionary spectroscopic technology that can detect chemical signatures from planets orbiting distant stars. Scientists have already identified water vapor, methane, and other compounds essential for life as we know it.</p>
      
      <h3>A New Era of Discovery</h3>
      
      <p>"This is the astronomical equivalent of developing a new sense," explained Dr. Maya Patel, APIT's principal investigator. "We've moved from merely detecting exoplanets to actually characterizing them in detail."</p>
      
      <p>Among the most exciting discoveries is a Neptune-sized planet designated Kepler-186f, which shows strong evidence of cloud formations and possible ocean surfaces. Located approximately 490 light-years from Earth, it orbits within the habitable zone of its star.</p>
      
      <p>The images have generated excitement throughout the scientific community. "We're looking at worlds that could potentially harbor life," noted astrobiologist Dr. Carlos Mendez. "These observations will help us prioritize targets for future research missions."</p>
      
      <h3>Technical Achievement</h3>
      
      <p>The telescope's capabilities represent a quantum leap in observational astronomy. Using an advanced coronagraph system, APIT can block the overwhelming light from a star to observe the much fainter planets orbiting it.</p>
      
      <p>Data analysis from the telescope's initial survey is expected to continue for several years, with scientists already identifying over 50 planets for detailed study. The mission is scheduled to continue for at least a decade, with potential for extension.</p>
      
      <p>"This is just the beginning," said NASA Administrator Bill Nelson. "APIT will fundamentally transform our understanding of planetary systems and potentially answer one of humanity's most profound questions: are we alone in the universe?"</p>
    `,
    likes: 1876,
    comments: 203,
    featured: true
  },
  {
    id: "5",
    title: "Major Breakthrough in Renewable Energy Storage Announced",
    summary: "New battery technology promises to solve intermittency issues plaguing wind and solar power generation.",
    imageUrl: "https://picsum.photos/seed/battery/1200/800",
    category: "Technology",
    date: "June 2, 2023",
    content: `
      <p>A team of researchers from the National Renewable Energy Laboratory has unveiled a revolutionary energy storage technology that could overcome one of the biggest challenges facing clean energy: storing power when the sun isn't shining and the wind isn't blowing.</p>
      
      <p>The new solid-state battery system, dubbed "GridStore," can retain energy for up to 30 days with minimal loss and costs approximately 80% less than current lithium-ion solutions. More importantly, it's composed of abundant, non-toxic materials, making it both environmentally friendly and scalable.</p>
      
      <h3>Game-Changing Technology</h3>
      
      <p>"This represents a fundamental breakthrough in our ability to transition to renewable energy," said Dr. Aisha Johnson, lead scientist on the project. "The intermittency problem has been the Achilles' heel of solar and wind power. GridStore effectively eliminates that concern."</p>
      
      <p>Initial tests show the system can achieve 97% efficiency in energy conversion and storage, far exceeding current technologies. It can also withstand over 10,000 charge cycles without significant degradation, giving it an estimated lifespan of 25-30 years.</p>
      
      <h3>Market Impact</h3>
      
      <p>Energy analysts predict the technology could accelerate the adoption of renewable energy worldwide. "This changes the economic equation entirely," noted Maria Gonzalez, senior energy analyst at Bloomberg New Energy Finance. "With affordable, long-duration storage, renewables become the obvious choice for new energy investments."</p>
      
      <p>Several utility companies have already announced partnerships to pilot the technology, with the first grid-scale installations expected within 18 months. Meanwhile, the research team is working to adapt the technology for residential use.</p>
      
      <p>"We envision a future where every home with solar panels includes a GridStore unit the size of a small refrigerator," explained Dr. Johnson. "This would allow homeowners to achieve true energy independence."</p>
      
      <p>As climate concerns intensify and countries seek to reduce carbon emissions, this breakthrough could provide a crucial tool in the global energy transition.</p>
    `,
    likes: 943,
    comments: 108
  },
  {
    id: "6",
    title: "Historic Peace Agreement Ends Decades-Long Regional Conflict",
    summary: "After years of negotiation, warring nations sign comprehensive peace treaty that addresses territorial disputes and establishes framework for cooperation.",
    imageUrl: "https://picsum.photos/seed/peace/1200/800",
    category: "Politics",
    date: "May 30, 2023",
    content: `
      <p>In a ceremony attended by world leaders and diplomatic representatives, the nations of Eastoria and Westaria signed a historic peace agreement today, ending a conflict that has spanned three decades and claimed an estimated 75,000 lives.</p>
      
      <p>The comprehensive treaty addresses longstanding territorial disputes, establishes demilitarized zones along contested borders, and creates a framework for economic cooperation between the former adversaries. United Nations Secretary-General described it as "a triumph of diplomacy over division."</p>
      
      <h3>Path to Peace</h3>
      
      <p>The agreement comes after three years of intense negotiations mediated by an international coalition led by the European Union and supported by the United States and China. Diplomatic sources credit the breakthrough to a change in leadership in both countries and mounting economic pressures exacerbated by the conflict.</p>
      
      <p>"This peace was built through painful compromise on both sides," said Eastoria's President Nadia Khoury. "But we recognize that our peoples share more than what divides us, and our future prosperity depends on cooperation, not conflict."</p>
      
      <p>Key provisions of the treaty include:</p>
      
      <ul>
        <li>Resolution of the disputed Northland Province through a power-sharing arrangement</li>
        <li>Protection of cultural and religious sites important to both nations</li>
        <li>Joint development of natural resources in contested regions</li>
        <li>Gradual reduction of military forces along borders</li>
        <li>Establishment of a truth and reconciliation commission</li>
      </ul>
      
      <h3>Regional Implications</h3>
      
      <p>Analysts suggest the agreement could transform regional politics and economics. Trade routes closed for decades are expected to reopen, potentially boosting regional GDP by up to 4% within five years according to World Bank estimates.</p>
      
      <p>"This isn't just about ending a war—it's about creating a new paradigm for cooperation in a region that has known too much conflict," explained diplomat Richard Haass, who participated in the negotiations.</p>
      
      <p>Implementation begins immediately, with international peacekeepers deploying to key areas to monitor the transition. Both nations have requested continued international support as they begin the challenging process of reconciliation and rebuilding.</p>
    `,
    likes: 1576,
    comments: 245,
    featured: true
  }
];

export const getTrendingArticles = () => {
  return newsArticles.sort((a, b) => b.likes - a.likes);
};

export const getFeaturedArticles = () => {
  return newsArticles.filter(article => article.featured);
};

export const getSavedArticles = () => {
  // In a real app, this would come from user data
  // For demo purposes, return a subset of articles
  return newsArticles.slice(1, 4);
};
