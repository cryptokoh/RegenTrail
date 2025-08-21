import { Event } from '../types/game';

export const events: Event[] = [
  {
    id: 'ethdenver2024',
    name: 'ETHDenver 2024 - Solarpunk Summit',
    date: 'February 29 - March 3, 2024',
    description: 'The largest Web3 #BUIDLathon in the world, featuring the Schelling Point conference on public goods and regenerative cryptoeconomics. Take the GreenPill and join the regenerative revolution!',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc61?auto=format&fit=crop&q=80&w=1920',
    attendees: 15000,
    location: 'Denver, Colorado',
    travelText: 'The Modal Motorcoach transforms into a solar-powered mountain cruiser heading to the Mile High City! 🏔️☀️',
    link: 'https://ethdenver.com',
    schedule: [
      { time: 'Feb 29', activity: 'Opening Ceremony & GreenPill Talks' },
      { time: 'Mar 1', activity: 'Schelling Point - Public Goods Summit' },
      { time: 'Mar 2', activity: 'ReFi Hackathon & Solarpunk Gallery' },
      { time: 'Mar 3', activity: 'Gitcoin Grants Round & Awards' }
    ]
  },
  {
    id: 'refi-summit-rio',
    name: 'ReFi Summit - Blockchain Rio',
    date: 'April 22-24, 2024',
    description: 'Where regenerative finance meets the vibrant culture of Brazil. Explore how blockchain enables environmental restoration, carbon credits, and community empowerment in the Global South.',
    image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80&w=1920',
    attendees: 2500,
    location: 'Rio de Janeiro, Brazil',
    travelText: 'The Modal Motorcoach grows wings and becomes a regenerative aircraft soaring over Copacabana! 🌴🇧🇷',
    link: 'https://blockchainrio.com.br/en/refi-summit/',
    schedule: [
      { time: 'Day 1', activity: 'Opening: State of ReFi 2024 Report Launch' },
      { time: 'Day 2', activity: 'Carbon Credits & Tokenization Workshop' },
      { time: 'Day 3', activity: 'Amazon Rainforest Conservation DAO Panel' },
      { time: 'Day 4', activity: 'Favela Solar Energy Projects Showcase' }
    ]
  },
  {
    id: 'gitcoin-grants-22',
    name: 'Gitcoin Grants Round 22',
    date: 'October 23 - November 6, 2024',
    description: 'The quarterly celebration of public goods funding! Support regenerative projects through quadratic funding. Over $60M distributed to builders championing climate, open source, and regenerative initiatives.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=1920',
    attendees: 50000,
    location: 'Global - Cyberspace',
    travelText: 'The Modal Motorcoach enters the metaverse, surfing through the quadratic funding matrix! 🌐💚',
    link: 'https://grants.gitcoin.co',
    schedule: [
      { time: 'Oct 23', activity: 'Round Opens - Climate Solutions Focus' },
      { time: 'Oct 30', activity: 'Community Matching Pool Donations' },
      { time: 'Nov 3', activity: 'Last Weekend Push - Double Matching' },
      { time: 'Nov 6', activity: 'Round Closes - Results Announced' }
    ]
  },
  {
    id: 'regenerative-travel-summit',
    name: 'The Regenerative Travel Summit 2024',
    date: 'June 15-17, 2024',
    description: 'Pioneering the future of sustainable tourism. Learn how travel can regenerate ecosystems, support local communities, and create positive impact while exploring the world.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1920',
    attendees: 800,
    location: 'Bali, Indonesia',
    travelText: 'The Modal Motorcoach transforms into a bamboo catamaran sailing through turquoise waters! 🌊🏝️',
    link: 'https://www.regenerativetravel.com/summit',
    schedule: [
      { time: 'Day 1', activity: 'Opening: Tourism as a Force for Good' },
      { time: 'Day 2', activity: 'Permaculture Farm Tours & Workshops' },
      { time: 'Day 3', activity: 'Community-Led Conservation Projects' }
    ]
  },
  {
    id: 'ethcc-paris',
    name: 'ETHcc 7 - Paris',
    date: 'July 8-11, 2024',
    description: 'The largest annual European Ethereum event. Special track on regenerative cryptoeconomics featuring Kevin Owocki, GreenPill podcast recordings, and ImpactDAO showcases.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1920',
    attendees: 6500,
    location: 'Paris, France',
    travelText: 'The Modal Motorcoach transforms into a high-speed maglev train zooming through the French countryside! 🚄🥐',
    link: 'https://ethcc.io',
    schedule: [
      { time: '9:00 AM', activity: 'Opening: Ethereum & Public Goods' },
      { time: '11:00 AM', activity: 'GreenPill Live Podcast Recording' },
      { time: '2:00 PM', activity: 'ReFi Builder Hackathon' },
      { time: '5:00 PM', activity: 'Solarpunk Soirée & Art Exhibition' }
    ]
  },
  {
    id: 'regen-ag-summit',
    name: 'Regenerative Agriculture Summit',
    date: 'September 18-20, 2024',
    description: 'Where soil health meets blockchain. Learn how tokenized carbon credits, DAO governance, and regenerative farming practices are healing the Earth one field at a time.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1920',
    attendees: 1200,
    location: 'Amsterdam, Netherlands',
    travelText: 'The Modal Motorcoach sprouts wheels made of mycelium networks, rolling through fields of tulips! 🌷🚲',
    link: 'https://regenerativeagriculturesummit.com',
    schedule: [
      { time: 'Day 1', activity: 'Soil Carbon Sequestration & Web3' },
      { time: 'Day 2', activity: 'Farm Visit: Tokenizing Regeneration' },
      { time: 'Day 3', activity: 'Building Agricultural DAOs Workshop' }
    ]
  },
  {
    id: 'tulum-cryptofest',
    name: 'Tulum Crypto Fest 2024',
    date: 'December 12-15, 2024',
    description: 'Ancient wisdom meets future finance under the full moon. Cenote ceremonies, regenerative city planning, and the launch of the Mayan Calendar NFT collection for forest preservation.',
    image: 'https://images.unsplash.com/photo-1509087859087-a384654eca4d?auto=format&fit=crop&q=80&w=1920',
    attendees: 3000,
    location: 'Tulum, Mexico',
    travelText: 'The Modal Motorcoach shapeshifts into a cosmic jaguar leaping through dimensional portals! 🐆✨',
    link: 'https://tulumcryptofest.com',
    schedule: [
      { 
        time: 'Day 1',
        activity: 'Beach Opening: Web3 & Indigenous Wisdom'
      },
      { 
        time: 'Day 2',
        activity: 'Cenote Ceremony & ReFi Workshops'
      },
      { 
        time: 'Day 3',
        activity: 'Full Moon Ritual & Solarpunk Party'
      },
      { 
        time: 'Day 4',
        activity: 'Regenerative City DAO Launch'
      }
    ]
  },
  {
    id: 'consensus-2024',
    name: 'Consensus 2024 - ReFi Track',
    date: 'May 29-31, 2024',
    description: 'The must-attend crypto event now features a dedicated Regenerative Finance track. Learn how DeFi is evolving into ReFi with real-world impact.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1920',
    attendees: 20000,
    location: 'Austin, Texas',
    travelText: 'The Modal Motorcoach transforms into a solar-powered lowrider cruising down 6th Street! 🤠🎸',
    link: 'https://consensus.coindesk.com',
    schedule: [
      { time: 'May 29', activity: 'Opening: State of Regenerative Finance' },
      { time: 'May 30', activity: 'Carbon Credit Tokenization Panel' },
      { time: 'May 31', activity: 'Public Goods Funding Mechanisms' }
    ]
  },
  {
    id: 'devcon-7',
    name: 'Devcon 7 - Bangkok',
    date: 'November 12-15, 2024',
    description: 'Ethereum\'s premier conference goes to Southeast Asia! Special focus on regenerative economics, public goods funding, and how Web3 can support climate refugees.',
    image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&q=80&w=1920',
    attendees: 12000,
    location: 'Bangkok, Thailand',
    travelText: 'The Modal Motorcoach transforms into a golden tuk-tuk powered by pad thai and good vibes! 🛺🏛️',
    link: 'https://devcon.org',
    schedule: [
      { time: 'Nov 12', activity: 'Opening: Ethereum for Regeneration' },
      { time: 'Nov 13', activity: 'Climate Refugee Support DAOs' },
      { time: 'Nov 14', activity: 'Southeast Asian ReFi Showcase' },
      { time: 'Nov 15', activity: 'Closing: Building the Solarpunk Future' }
    ]
  }
];