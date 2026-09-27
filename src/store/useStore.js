import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'map', // 'map' | 'resources' | 'incidents' | 'broadcast'
  selectedSeverity: 'All', // 'All' | 'Critical' | 'Severe' | 'Moderate'
  selectedIncidentId: 'INC-101',

  stats: {
    activeIncidents: 4,
    evacueesSheltered: 1840,
    fieldTeamsDeployed: 28,
    reliefSuppliesDispatchedTons: 142
  },

  incidents: [
    {
      id: 'INC-101',
      title: 'Flash Flood Breach in Sector 4 Canal',
      type: 'Flood',
      severity: 'Critical',
      coordinates: { x: 38, y: 42 },
      location: 'Riverside Basin & Lowlands',
      reportedTime: '12 mins ago',
      status: 'Active Response',
      affectedPopulation: 4200,
      assignedTeams: ['Rapid Rescue Bravo', 'Swift Water Div 2'],
      requiredResources: [
        { name: 'Inflatable Zodiac Boats', requested: 12, fulfilled: 8 },
        { name: 'Potable Water Pallets', requested: 50, fulfilled: 35 },
        { name: 'Emergency Blankets', requested: 2000, fulfilled: 1800 }
      ],
      description: 'Secondary levee failure resulting in 1.5m rapid standing water across residential corridors. Evacuation in progress.'
    },
    {
      id: 'INC-102',
      title: 'Structural Collapse at Industrial Substation',
      type: 'Infrastructure',
      severity: 'Critical',
      coordinates: { x: 62, y: 28 },
      location: 'Northern Power Grid Bay 7',
      reportedTime: '34 mins ago',
      status: 'Containment',
      affectedPopulation: 850,
      assignedTeams: ['USAR Urban Search Team Alpha'],
      requiredResources: [
        { name: 'Heavy Hydraulic Spreaders', requested: 4, fulfilled: 4 },
        { name: 'Trauma Paramedic Units', requested: 8, fulfilled: 6 }
      ],
      description: 'Roof truss collapse following transformer blowout. Search and rescue underway for trapped maintenance personnel.'
    },
    {
      id: 'INC-103',
      title: 'Wildfire Perimeter Encroachment',
      type: 'Wildfire',
      severity: 'Severe',
      coordinates: { x: 78, y: 72 },
      location: 'Pine Crest Ridge Zone 3',
      reportedTime: '1 hour ago',
      status: 'Controlled',
      affectedPopulation: 1200,
      assignedTeams: ['Helitack Aerial Drop 1'],
      requiredResources: [
        { name: 'Fire Retardant Drops', requested: 6, fulfilled: 5 },
        { name: 'N95 Particle Masks', requested: 5000, fulfilled: 5000 }
      ],
      description: 'Shift in wind pushing ridge fires toward eastern evacuation perimeter. Level 3 Go Now warnings active.'
    }
  ],

  resources: [
    { id: 'RES-01', name: 'Field Trauma Surgical Kit', category: 'Medical', available: 45, deployed: 32, unit: 'Kits' },
    { id: 'RES-02', name: 'Mobile Water Purification Unit', category: 'Sanitation', available: 8, deployed: 6, unit: 'Trucks' },
    { id: 'RES-03', name: 'Heavy Rescue Boats', category: 'Logistics', available: 18, deployed: 14, unit: 'Vessels' },
    { id: 'RES-04', name: 'Satellite Uplink Terminals', category: 'Comms', available: 25, deployed: 20, unit: 'Units' },
    { id: 'RES-05', name: 'Emergency MRE Food Rations', category: 'Food', available: 12500, deployed: 8400, unit: 'Packs' }
  ],

  broadcasts: [
    { id: 'BC-901', time: '14:20 UTC', channel: 'EAS High Priority', text: 'EVACUATION ORDER: Sector 4 Lowlands proceed immediately to East High Shelter.', sender: 'State Ops Commander' },
    { id: 'BC-902', time: '13:45 UTC', channel: 'Field Teams', text: 'Bridge 9 load limit restricted to emergency vehicles under 10 tons.', sender: 'Logistics Liaison' }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedSeverity: (sev) => set({ selectedSeverity: sev }),
  setSelectedIncidentId: (id) => set({ selectedIncidentId: id }),

  allocateResource: (resourceId, count) => set((state) => ({
    resources: state.resources.map(r => {
      if (r.id === resourceId && r.available >= count) {
        return {
          ...r,
          available: r.available - count,
          deployed: r.deployed + count
        };
      }
      return r;
    })
  })),

  addIncident: (incidentData) => set((state) => {
    const newInc = {
      id: `INC-${Math.floor(104 + Math.random() * 900)}`,
      status: 'Active Response',
      reportedTime: 'Just now',
      assignedTeams: ['Rapid Dispatch Unit'],
      coordinates: { x: 50 + (Math.random() * 30 - 15), y: 50 + (Math.random() * 30 - 15) },
      requiredResources: [
        { name: 'Emergency Supply Kits', requested: 20, fulfilled: 10 }
      ],
      ...incidentData
    };
    return {
      incidents: [newInc, ...state.incidents],
      activeTab: 'map',
      selectedIncidentId: newInc.id
    };
  }),

  sendBroadcast: (text, channel) => set((state) => ({
    broadcasts: [
      {
        id: `BC-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
        channel: channel || 'EAS Broadcast',
        text,
        sender: 'Duty Incident Commander (You)'
      },
      ...state.broadcasts
    ]
  }))
}));
