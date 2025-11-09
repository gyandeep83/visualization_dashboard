import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const countryCoordinates = {
    "United States of America": [39.8283, -98.5795],
    "Mexico": [23.6345, -102.5528],
    "Canada": [56.1304, -106.3468],
    "Brazil": [-14.235, -51.9253],
    "Colombia": [4.5709, -74.2973],
    "Argentina": [-38.4161, -63.6167],
    "United Kingdom": [55.3781, -3.4360],
    "Germany": [51.1657, 10.4515],
    "France": [46.6034, 1.8883],
    "Italy": [41.8719, 12.5674],
    "Ukraine": [48.3794, 31.1656],
    "Russia": [61.524, 105.3188],
    "Austria": [47.5162, 14.5501],
    "Spain": [40.4637, -3.7492],
    "Estonia": [58.5953, 25.0136],
    "Hungary": [47.1625, 19.5033],
    "Norway": [60.472, 8.4689],
    "Poland": [51.9194, 19.1451],
    "Denmark": [56.2639, 9.5018],
    "Kazakhstan": [48.0196, 66.9237],
    "Australia": [-25.2744, 133.7751],
    "Nigeria": [9.082, 8.6753],
    "India": [20.5937, 78.9629],
    "China": [35.8617, 104.1954],
    "Japan": [36.2048, 138.2529],
    "Saudi Arabia": [23.8859, 45.0792],
    "Lebanon": [33.8547, 35.8623],
    "Azerbaijan": [40.1431, 47.5769],
    "Indonesia": [-0.7893, 113.9213],
    "Pakistan": [30.3753, 69.3451],
    "Iran": [32.4279, 53.6880],
    "Iraq": [33.3152, 44.3661],
    "Qatar": [25.3548, 51.1839],
    "Oman": [21.4735, 55.9754],
    "Malaysia": [4.2105, 101.9758],
    "Jordan": [30.5852, 36.2384],
    "Syria": [34.8021, 38.9968],
    "Turkey": [38.9637, 35.2433],
    "Cyprus": [35.1264, 33.4299],
    "United Arab Emirates": [23.4241, 53.8478],
    "Ethiopia": [9.145, 40.4897],
    "Ghana": [7.9465, -1.0232],
    "Morocco": [31.7917, -7.0926],
    "South Sudan": [6.877, 31.307],
    "Venezuela": [6.4238, -66.5897],
    "Burkina Faso": [12.2383, -1.5616],
    "Kuwait": [29.3759, 47.9774],
    "Greece": [39.0742, 21.8243],
    "Algeria": [28.0339, 1.6596],
    "Gabon": [-0.8037, 11.6094],
    "Belize": [17.1899, -88.4976],
    "Libya": [26.3351, 17.2283],
    "Niger": [17.6078, 8.0817],
    "Mali": [17.5707, -3.9962],
    "Angola": [-11.2027, 17.8739],
    "South Africa": [-30.5595, 22.9375],
    "Egypt": [26.8206, 30.8025]
};

const regionMapping = {
    "North America": ["United States of America", "Canada", "Mexico"],
    "South America": ["Brazil", "Colombia", "Venezuela", "Argentina"],
    "Europe": ["United Kingdom", "Germany", "France", "Italy", "Austria", "Spain", "Estonia", "Hungary", "Norway", "Poland", "Denmark", "Greece", "Cyprus"],
    "Asia": ["India", "China", "Japan", "Indonesia", "Pakistan", "Malaysia", "Kazakhstan"],
    "Africa": ["Nigeria", "South Africa", "Egypt", "Angola", "Libya", "Niger", "Mali", "Ethiopia", "Ghana", "Morocco", "South Sudan", "Burkina Faso", "Algeria", "Gabon"],
    "Middle East": ["Saudi Arabia", "Lebanon", "Iran", "Iraq", "Kuwait", "United Arab Emirates", "Jordan", "Syria", "Qatar", "Oman", "Turkey"],
    "Oceania": ["Australia"]
};

const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#d35400'];

const App = () => {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [mapContainer, setMapContainer] = useState(null);
    const [map, setMap] = useState(null);
    const [markersLayer, setMarkersLayer] = useState(null);
    const [filters, setFilters] = useState({
        end_year: "",
        topic: "",
        sector: "",
        region: "",
        pestle: "",
        source: "",
        swot: "",
        country: "",
    });

    // Generate comprehensive mock data
    useEffect(() => {
        const topics = ["Energy", "Technology", "Healthcare", "Finance", "Environment", "Security", "Trade", "Politics", "Climate", "Economy"];
        const sectors = ["Energy", "Government", "Technology", "Healthcare", "Financial", "Manufacturing", "Agriculture", "Transportation", "Education", "Defense"];
        const regions = Object.keys(regionMapping);
        const countries = Object.keys(countryCoordinates);
        const pestles = ["Political", "Economic", "Social", "Technological", "Legal", "Environmental"];
        const sources = ["Reuters", "BBC", "CNN", "Financial Times", "Bloomberg", "The Guardian", "Wall Street Journal"];
        const swots = ["Strength", "Weakness", "Opportunity", "Threat"];
        const cities = ["New York", "London", "Tokyo", "Berlin", "Paris", "Mumbai", "Beijing", "Sydney", "Toronto", "Dubai"];

        const mockData = [];
        
        // Generate diverse data points
        for (let i = 0; i < 500; i++) {
            const startYear = 2010 + Math.floor(Math.random() * 21); // 2010-2030
            const endYear = startYear + Math.floor(Math.random() * 5); // up to 5 years later
            const country = countries[Math.floor(Math.random() * countries.length)];
            
            mockData.push({
                id: i,
                start_year: startYear,
                end_year: endYear,
                intensity: Math.floor(Math.random() * 10) + 1,
                likelihood: Math.floor(Math.random() * 5) + 1,
                relevance: Math.floor(Math.random() * 5) + 1,
                topic: topics[Math.floor(Math.random() * topics.length)],
                sector: sectors[Math.floor(Math.random() * sectors.length)],
                region: regions[Math.floor(Math.random() * regions.length)],
                country: country,
                city: cities[Math.floor(Math.random() * cities.length)],
                pestle: pestles[Math.floor(Math.random() * pestles.length)],
                source: sources[Math.floor(Math.random() * sources.length)],
                swot: swots[Math.floor(Math.random() * swots.length)],
                title: `Sample Article ${i + 1}`,
                insight: `This is a sample insight for data point ${i + 1}`
            });
        }
        
        setAllData(mockData);
        setFilteredData(mockData);
    }, []);

    // Initialize Leaflet map
    useEffect(() => {
        if (!mapContainer) return;

        // Load Leaflet CSS and JS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        
        script.onload = () => {
            if (window.L && !map) {
                const leafletMap = window.L.map(mapContainer, {
                    center: [20, 0],
                    zoom: 2,
                    scrollWheelZoom: true,
                    zoomControl: true
                });

                // Add tile layer
                window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 18,
                }).addTo(leafletMap);

                // Create markers layer group
                const markers = window.L.layerGroup().addTo(leafletMap);

                setMap(leafletMap);
                setMarkersLayer(markers);
            }
        };

        document.head.appendChild(script);

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [mapContainer]);

    // Update map markers when filtered data changes
    useEffect(() => {
        if (!map || !markersLayer || !window.L) return;

        // Clear existing markers
        markersLayer.clearLayers();

        // Process data by country
        const countryData = filteredData
            .filter(d => d.country && countryCoordinates[d.country])
            .reduce((acc, d) => {
                const country = d.country;
                if (!acc[country]) {
                    acc[country] = {
                        coords: countryCoordinates[country],
                        intensity: 0,
                        count: 0,
                        records: []
                    };
                }
                acc[country].intensity += d.intensity || 0;
                acc[country].count += 1;
                acc[country].records.push(d);
                return acc;
            }, {});

        // Add markers for each country
        Object.entries(countryData).forEach(([country, data]) => {
            const [lat, lng] = data.coords;
            const avgIntensity = data.intensity / data.count;
            
            // Determine marker color based on intensity
            let color = '#3498db'; // default blue
            if (avgIntensity >= 8) color = '#e74c3c'; // red for high intensity
            else if (avgIntensity >= 6) color = '#f39c12'; // orange for medium-high
            else if (avgIntensity >= 4) color = '#f1c40f'; // yellow for medium
            else if (avgIntensity >= 2) color = '#2ecc71'; // green for low-medium

            // Create custom icon
            const customIcon = window.L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                    background-color: ${color};
                    width: ${Math.max(20, Math.min(50, data.count * 2))}px;
                    height: ${Math.max(20, Math.min(50, data.count * 2))}px;
                    border-radius: 50%;
                    border: 3px solid white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: ${Math.max(10, Math.min(16, data.count / 2 + 8))}px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    cursor: pointer;
                ">${data.count}</div>`,
                iconSize: [Math.max(20, Math.min(50, data.count * 2)), Math.max(20, Math.min(50, data.count * 2))],
                iconAnchor: [Math.max(10, Math.min(25, data.count)), Math.max(10, Math.min(25, data.count))]
            });

            // Create popup content
            const popupContent = `
                <div style="font-family: Arial, sans-serif; min-width: 200px;">
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px;">${country}</h3>
                    <div style="margin-bottom: 8px;"><strong>Records:</strong> ${data.count}</div>
                    <div style="margin-bottom: 8px;"><strong>Avg Intensity:</strong> ${avgIntensity.toFixed(1)}</div>
                    <div style="margin-bottom: 8px;"><strong>Total Intensity:</strong> ${data.intensity}</div>
                    <div style="margin-bottom: 8px;"><strong>Top Topics:</strong></div>
                    <div style="font-size: 12px; color: #666;">
                        ${[...new Set(data.records.slice(0, 3).map(r => r.topic))].join(', ')}
                    </div>
                </div>
            `;

            // Create marker and add to layer
            const marker = window.L.marker([lat, lng], { icon: customIcon })
                .bindPopup(popupContent, {
                    maxWidth: 300,
                    className: 'custom-popup'
                });

            markersLayer.addLayer(marker);
        });

        // Add custom CSS for markers
        if (!document.getElementById('leaflet-custom-styles')) {
            const style = document.createElement('style');
            style.id = 'leaflet-custom-styles';
            style.textContent = `
                .custom-marker {
                    background: transparent !important;
                    border: none !important;
                }
                .custom-popup .leaflet-popup-content-wrapper {
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                }
                .custom-popup .leaflet-popup-tip {
                    background: white;
                }
            `;
            document.head.appendChild(style);
        }

    }, [filteredData, map, markersLayer]);

    // Filter data whenever filters change
    useEffect(() => {
        let filtered = allData.filter((item) => {
            return Object.keys(filters).every((key) => {
                const filterValue = filters[key].toLowerCase().trim();
                if (!filterValue) return true;

                if (key === 'end_year') {
                    return item.end_year?.toString().includes(filterValue);
                }
                
                if (key === 'region') {
                    // Handle region filtering with mapping
                    const userRegion = filterValue;
                    if (regionMapping[userRegion]) {
                        return regionMapping[userRegion].includes(item.country);
                    }
                    // Partial matches
                    if (userRegion.includes("america")) {
                        return [...regionMapping["North America"], ...regionMapping["South America"]].includes(item.country);
                    }
                    if (userRegion.includes("europe")) {
                        return regionMapping["Europe"].includes(item.country);
                    }
                    if (userRegion.includes("asia")) {
                        return regionMapping["Asia"].includes(item.country);
                    }
                    if (userRegion.includes("africa")) {
                        return regionMapping["Africa"].includes(item.country);
                    }
                    if (userRegion.includes("middle")) {
                        return regionMapping["Middle East"].includes(item.country);
                    }
                    return item.region?.toLowerCase().includes(userRegion);
                }

                const itemValue = item[key]?.toString().toLowerCase() || "";
                return itemValue.includes(filterValue);
            });
        });
        
        setFilteredData(filtered);
    }, [filters, allData]);

    const handleFilterChange = (e) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [e.target.name]: e.target.value,
        }));
    };

    // Process intensity data by topic
    const processIntensityData = () => {
        const topicIntensity = {};
        filteredData.forEach((d) => {
            const topic = d.topic || "Unknown";
            if (!topicIntensity[topic]) {
                topicIntensity[topic] = { total: 0, count: 0 };
            }
            topicIntensity[topic].total += d.intensity || 0;
            topicIntensity[topic].count += 1;
        });

        return Object.keys(topicIntensity).map(topic => ({
            name: topic,
            value: topicIntensity[topic].count > 0 ? 
                parseFloat((topicIntensity[topic].total / topicIntensity[topic].count).toFixed(2)) : 0
        }));
    };

    // Process likelihood trends over time
    const processLikelihoodData = () => {
        const yearlyData = {};
        
        filteredData.forEach((d) => {
            const year = d.start_year || d.end_year || 'Unknown';
            if (year !== 'Unknown') {
                if (!yearlyData[year]) {
                    yearlyData[year] = { total: 0, count: 0 };
                }
                yearlyData[year].total += (d.likelihood || 0);
                yearlyData[year].count += 1;
            }
        });

        return Object.keys(yearlyData)
            .filter(year => year !== 'Unknown')
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(year => ({
                year: year,
                likelihood: yearlyData[year].count > 0 ? 
                    parseFloat((yearlyData[year].total / yearlyData[year].count).toFixed(2)) : 0
            }));
    };

    // Process sector data for pie chart
    const processSectorData = () => {
        const sectorCounts = {};
        filteredData.forEach((d) => {
            const sector = d.sector || "Unknown";
            sectorCounts[sector] = (sectorCounts[sector] || 0) + (d.intensity || 0);
        });

        return Object.keys(sectorCounts).map((sector, index) => ({
            name: sector,
            value: sectorCounts[sector],
            color: COLORS[index % COLORS.length]
        }));
    };

    const intensityData = processIntensityData();
    const likelihoodData = processLikelihoodData();
    const sectorData = processSectorData();

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const displayLabel = label || data.name || 'Unknown';
            const displayValue = payload[0].value;
            
            return (
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '12px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}>
                    <p style={{ margin: 0 }}>{`${displayLabel}: ${displayValue}`}</p>
                </div>
            );
        }
        return null;
    };

    const PieTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '12px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    minWidth: '120px'
                }}>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{data.name}</p>
                    <p style={{ margin: 0 }}>{`Intensity: ${data.value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
        }}>
            <h2 style={{
                textAlign: 'center',
                color: '#2c3e50',
                marginBottom: '30px',
                fontWeight: '600',
                paddingBottom: '10px',
                borderBottom: '3px solid #3498db',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '2.5rem'
            }}>Interactive Visualization Dashboard</h2>

            {/* Data Summary */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '15px',
                padding: '25px',
                marginBottom: '25px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>
                        {filteredData.length}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Records</div>
                </div>
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>
                        {new Set(filteredData.map(d => d.country)).size}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Countries</div>
                </div>
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>
                        {new Set(filteredData.map(d => d.topic)).size}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Topics</div>
                </div>
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>
                        {filteredData.length > 0 ? (filteredData.reduce((sum, d) => sum + (d.intensity || 0), 0) / filteredData.length).toFixed(1) : '0'}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Avg Intensity</div>
                </div>
            </div>

            {/* Sticky Filters */}
            <div style={{
                position: 'sticky',
                top: '0',
                zIndex: 1000,
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '0 0 15px 15px',
                marginBottom: '25px'
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    gap: '15px',
                    padding: '25px',
                }}>
                    {Object.keys(filters).map((key) => (
                        <input
                            key={key}
                            type={key === "end_year" ? "number" : "text"}
                            name={key}
                            value={filters[key]}
                            placeholder={`Filter by ${key.replace("_", " ")}`}
                            onChange={handleFilterChange}
                            style={{
                                padding: '12px 16px',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                width: '180px',
                                fontSize: '14px',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                background: '#f8f9fa'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.background = 'white';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e0e0e0';
                                e.target.style.background = '#f8f9fa';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    ))}
                </div>
                
                {/* Filter Status Indicator */}
                <div style={{
                    textAlign: 'center',
                    padding: '10px 20px',
                    backgroundColor: '#f8f9fa',
                    borderTop: '1px solid #e0e0e0',
                    fontSize: '12px',
                    color: '#666'
                }}>
                    {Object.values(filters).some(filter => filter.trim() !== '') ? (
                        <span style={{ color: '#667eea', fontWeight: '500' }}>
                            🔍 Filters Active • Showing {filteredData.length} of {allData.length} records
                        </span>
                    ) : (
                        <span>
                            📊 All Data • {allData.length} total records
                        </span>
                    )}
                </div>
            </div>

            {/* Charts */}
            <div style={{
                background: '#ffffff',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                margin: '30px 0'
            }}>
                <h3 style={{
                    textAlign: 'center',
                    color: '#2c3e50',
                    margin: '0 0 30px',
                    fontWeight: '600',
                    fontSize: '1.8rem'
                }}>📊 Data Insights</h3>
                
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '30px',
                    marginBottom: '30px'
                }}>
                    {/* Bar Chart */}
                    <div style={{
                        height: '350px',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 4px 15px rgba(240, 147, 251, 0.3)'
                    }}>
                        <h4 style={{ 
                            color: 'white', 
                            textAlign: 'center', 
                            margin: '0 0 20px',
                            fontSize: '1.1rem',
                            fontWeight: '500'
                        }}>Average Intensity by Topic</h4>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={intensityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                                <XAxis 
                                    dataKey="name" 
                                    tick={{ fill: 'white', fontSize: 10 }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                />
                                <YAxis tick={{ fill: 'white', fontSize: 12 }} />
                                <Tooltip content={<PieTooltip />} />
                                <Bar dataKey="value" fill="#ffffff" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    
                    {/* Pie Chart */}
                    <div style={{
                        height: '350px',
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
                    }}>
                        <h4 style={{ 
                            color: 'white', 
                            textAlign: 'center', 
                            margin: '0 0 20px',
                            fontSize: '1.1rem',
                            fontWeight: '500'
                        }}>Total Intensity by Sector</h4>
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={sectorData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sectorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend 
                                    wrapperStyle={{ color: 'white', fontSize: '11px' }}
                                    iconType="circle"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Line Chart */}
                <div style={{
                    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 4px 15px rgba(168, 237, 234, 0.3)'
                }}>
                    <h4 style={{ 
                        color: '#2c3e50', 
                        textAlign: 'center', 
                        margin: '0 0 20px',
                        fontSize: '1.2rem',
                        fontWeight: '600'
                    }}>📈 Likelihood Trends Over Time</h4>
                    
                    <div style={{
                        width: '100%',
                        height: '400px',
                        overflowX: 'auto',
                        borderRadius: '8px'
                    }}>
                        <div style={{
                            width: `${Math.max(800, likelihoodData.length * 60)}px`,
                            height: '380px'
                        }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={likelihoodData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.2)" />
                                    <XAxis 
                                        dataKey="year" 
                                        tick={{ fill: '#2c3e50', fontSize: 11 }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                    />
                                    <YAxis tick={{ fill: '#2c3e50', fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line 
                                        type="monotone" 
                                        dataKey="likelihood" 
                                        stroke="#e74c3c" 
                                        strokeWidth={3}
                                        dot={{ fill: '#e74c3c', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, stroke: '#c0392b', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <p style={{
                        textAlign: 'center',
                        color: '#2c3e50',
                        fontSize: '14px',
                        marginTop: '15px',
                        fontStyle: 'italic'
                    }}>
                        💡 Scroll horizontally to view all data points
                    </p>
                </div>
            </div>

            {/* Leaflet Map */}
            <div style={{
                background: '#ffffff',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                margin: '30px 0'
            }}>
                <h3 style={{
                    textAlign: 'center',
                    color: '#2c3e50',
                    margin: '0 0 25px',
                    fontWeight: '600',
                    fontSize: '1.8rem'
                }}>🗺️ Geographical Data Distribution</h3>
                
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '500px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                    <div 
                        ref={setMapContainer}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '12px'
                        }}
                    />
                    
                    {/* Map Legend */}
                    <div style={{
                        position: 'absolute',
                        bottom: '15px',
                        left: '15px',
                        background: 'rgba(255,255,255,0.95)',
                        padding: '15px 20px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#333',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 1000
                    }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
                            🌍 Intensity Legend
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#e74c3c' }}></div>
                                <span>High (8-10)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#f39c12' }}></div>
                                <span>Medium-High (6-7)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#f1c40f' }}></div>
                                <span>Medium (4-5)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#2ecc71' }}></div>
                                <span>Low-Medium (2-3)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3498db' }}></div>
                                <span>Low (0-1)</span>
                            </div>
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '10px', color: '#666', fontStyle: 'italic' }}>
                            • Marker size = number of records<br/>
                            • Click markers for details
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Statistics */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                margin: '30px 0'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(255, 154, 158, 0.3)'
                }}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem' }}>📊 Most Active Topic</h4>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {intensityData.length > 0 ? 
                            intensityData.reduce((max, item) => item.value > max.value ? item : max, intensityData[0]).name 
                            : 'N/A'
                        }
                    </div>
                </div>
                
                <div style={{
                    background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(161, 140, 209, 0.3)'
                }}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem' }}>🏢 Leading Sector</h4>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {sectorData.length > 0 ? 
                            sectorData.reduce((max, item) => item.value > max.value ? item : max, sectorData[0]).name 
                            : 'N/A'
                        }
                    </div>
                </div>
                
                <div style={{
                    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    color: '#2c3e50',
                    boxShadow: '0 4px 15px rgba(252, 182, 159, 0.3)'
                }}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem' }}>📈 Peak Year</h4>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {likelihoodData.length > 0 ? 
                            likelihoodData.reduce((max, item) => item.likelihood > max.likelihood ? item : max, likelihoodData[0]).year 
                            : 'N/A'
                        }
                    </div>
                </div>
                
                <div style={{
                    background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    color: '#2c3e50',
                    boxShadow: '0 4px 15px rgba(210, 153, 194, 0.3)'
                }}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem' }}>🎯 Data Quality</h4>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {filteredData.length > 0 ? 
                            `${((filteredData.filter(d => d.intensity > 0).length / filteredData.length) * 100).toFixed(0)}%`
                            : '0%'
                        }
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{
                textAlign: 'center',
                padding: '20px',
                color: '#666',
                fontSize: '14px',
                borderTop: '1px solid #e0e0e0',
                marginTop: '40px'
            }}>
                <p style={{ margin: '0' }}>
                    🚀 Interactive Dashboard • Real-time filtering • {filteredData.length} records displayed • Powered by Leaflet Maps
                </p>
            </div>
        </div>
    );
};

export default App;