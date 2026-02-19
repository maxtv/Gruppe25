import React, { useState, Suspense } from 'react';
import Header from './components/Header';
import PlayerOverview from './components/PlayerOverview';
import DashboardGrid from './components/DashboardGrid';
const DetailView = React.lazy(() => import('./components/DetailView'));
import './App.css';
import Papa from 'papaparse';

console.log('App.jsx module loaded');

function App() {
    const [selectedMetric, setSelectedMetric] = useState(null);
    const [allPlayers, setAllPlayers] = useState([]); // List of player names
    const [allData, setAllData] = useState([]); // All rows from CSV
    const [selectedPlayerName, setSelectedPlayerName] = useState("");

    // Derived state for current player and metrics
    const [player, setPlayer] = useState(null);
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataFilter, setDataFilter] = useState('all'); // 'all' | 'csv' | 'external'
    const [selectedDataView, setSelectedDataView] = useState('merged'); // 'merged' | 'csv' | 'playermaker' | 'catapult'

    React.useEffect(() => {
        // Parse CSV and optionally merge Playermaker JSON
        Papa.parse('/data.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            delimiter: "\t",
            beforeFirstChunk: (chunk) => {
                const lines = chunk.split(/\r\n|\r|\n/);
                return lines.slice(8).join('\n');
            },
            complete: async (results) => {
                if (results.data && results.data.length > 0) {
                    const placeholderNames = [
                        'John Doe', 'Jane Doe', 'Alex Johnson', 'Chris Smith', 'Sam Taylor',
                        'Taylor Morgan', 'Pat Riley', 'Jordan Blake', 'Casey Reed', 'Morgan Lee'
                    ];

                    const dataWithNames = results.data.map((row, idx) => {
                        const raw = row['Player Name'] ? String(row['Player Name']).trim() : '';
                        if (!raw) {
                            row['Player Name'] = placeholderNames[idx % placeholderNames.length] + ` #${idx+1}`;
                        }
                        // tag CSV rows so we can filter later
                        return { ...row, _source: 'csv', _sources: ['csv'] };
                    });

                    // Try to load Playermaker and Catapult mock data and merge
                    try {
                        // Fetch Playermaker
                        const respPm = await fetch('/playermaker.json');
                        const pmData = respPm.ok ? await respPm.json() : [];

                        const pmNormalized = pmData.map((p, i) => ({
                            'Player Name': p['Player Name'] || `PM Player ${i+1}`,
                            'Distance Covered (m)': String(p['Distance Covered (m)'] || 0),
                            'Top Speed (m/s)': String(p['Top Speed (m/s)'] || 0),
                            'Sprint Count (#)': String(p['Sprint Count (#)'] || 0),
                            'Work Rate (m/min)': String(p['Work Rate (m/min)'] || 0),
                            'Total Touches (#)': String(p['Total Touches (#)'] || 0),
                            'Position': p['Position'] || '',
                            'Session Type': p['Session Type'] || 'Match',
                            'Date': p['Date'] || '',
                            _source: 'playermaker',
                            _sources: ['playermaker']
                        }));

                        // Fetch Catapult
                        const respCat = await fetch('/catapult.json');
                        const catData = respCat.ok ? await respCat.json() : [];

                        const catNormalized = catData.map((c, i) => ({
                            'Player Name': c['player_name'] || `CAT Player ${i+1}`,
                            'Distance Covered (m)': String(c['total_distance_m'] || 0),
                            // Catapult stores speed in kph; convert to m/s for consistency then keep m/s
                            'Top Speed (m/s)': String(( (c['max_speed_kph'] || 0) / 3.6 ).toFixed(2)),
                            'Sprint Count (#)': String(c['sprint_count'] || 0),
                            'Work Rate (m/min)': String(c['work_rate_m_per_min'] || 0),
                            'Total Touches (#)': String(c['touches'] || 0),
                            'Position': c['position'] || '',
                            'Session Type': c['session_type'] || 'Match',
                            'Date': c['date'] || '',
                            _source: 'catapult',
                            _sources: ['catapult']
                        }));

                        // Merge CSV (dataWithNames) + Playermaker + Catapult by Player Name
                        const map = new Map();
                        // seed with CSV rows and store raw
                        dataWithNames.forEach(r => map.set(r['Player Name'], { ...(r || {}), _raw: { csv: r }, _sources: ['csv'], _source: 'csv' }));

                        const mergeRow = (src, srcKey) => {
                            src.forEach(r => {
                                const name = r['Player Name'];
                                const existing = map.get(name) || { _raw: {}, _sources: [] };
                                const existingSources = existing._sources || [];
                                const incomingSources = r._sources || (r._source ? [r._source] : [srcKey]);
                                const mergedSources = Array.from(new Set(existingSources.concat(incomingSources)));

                                // create merged entry where CSV/existing values take precedence
                                const merged = { ...(r || {}), ...(existing || {}) };

                                // ensure _raw object contains per-source originals
                                const raw = Object.assign({}, existing._raw || {});
                                raw[srcKey] = r;
                                merged._raw = raw;
                                merged._sources = mergedSources;
                                merged._source = mergedSources.length === 1 ? mergedSources[0] : 'merged';
                                map.set(name, merged);
                            });
                        };

                        mergeRow(pmNormalized, 'playermaker');
                        mergeRow(catNormalized, 'catapult');

                        const combined = Array.from(map.values());
                        setAllData(combined);
                        const playerNames = [...new Set(combined.map(r => r['Player Name']))].filter(Boolean);
                        setAllPlayers(playerNames);
                        if (playerNames.length > 0) setSelectedPlayerName(playerNames[0]);
                        setLoading(false);
                        return;
                    } catch (e) {
                        console.warn('Could not load external mock data', e);
                    }

                    // Fallback to CSV-only
                    setAllData(dataWithNames);
                    const playerNames = [...new Set(dataWithNames.map(r => r['Player Name']))].filter(Boolean);
                    setAllPlayers(playerNames);
                    if (playerNames.length > 0) setSelectedPlayerName(playerNames[0]);
                } else {
                    setLoading(false);
                }
            },
            error: (err) => {
                console.error('Error parsing CSV:', err);
                setLoading(false);
            }
        });
    }, []);

    // derive visible players based on filter
    const visiblePlayers = React.useMemo(() => {
        if (!allData || allData.length === 0) return [];
        const list = allData.filter(r => {
            const sources = r._sources || (r._source ? [r._source] : []);
            if (dataFilter === 'all') return true;
            if (dataFilter === 'csv') return sources.includes('csv');
            if (dataFilter === 'external') return sources.some(s => s === 'playermaker' || s === 'catapult');
            return true;
        }).map(r => r['Player Name']);
        return Array.from(new Set(list));
    }, [allData, dataFilter]);

    React.useEffect(() => {
        if (!selectedPlayerName || allData.length === 0) return;

        const row = allData.find(r => r['Player Name'] === selectedPlayerName);
        if (!row) {
            setLoading(false);
            return;
        }

        // pick source-specific row based on selectedDataView
        const sourceRow = (() => {
            if (selectedDataView === 'merged') return row;
            const raw = row._raw || {};
            if (selectedDataView === 'csv' && raw.csv) return raw.csv;
            if (selectedDataView === 'playermaker' && raw.playermaker) return raw.playermaker;
            if (selectedDataView === 'catapult' && raw.catapult) return raw.catapult;
            // fallback to merged
            return row;
        })();

        const metricsMapping = [
            {
                id: 'distance',
                name: 'Total Distance',
                value: parseFloat(sourceRow['Distance Covered (m)']) / 1000 || 0,
                unit: 'km',
                color: '#3b82f6',
                target: 12
            },
            {
                id: 'speed',
                name: 'Top Speed',
                value: parseFloat(sourceRow['Top Speed (m/s)']) * 3.6 || 0,
                unit: 'km/h',
                color: '#ef4444',
                target: 35
            },
            {
                id: 'sprints',
                name: 'Sprint Count',
                value: parseInt(sourceRow['Sprint Count (#)']) || 0,
                unit: 'sprints',
                color: '#f59e0b',
                target: 50
            },
            {
                id: 'workrate',
                name: 'Work Rate',
                value: parseFloat(sourceRow['Work Rate (m/min)']) || 0,
                unit: 'm/min',
                color: '#10b981',
                target: 100
            },
            {
                id: 'touches',
                name: 'Total Touches',
                value: parseInt(sourceRow['Total Touches (#)']) || 0,
                unit: 'touches',
                color: '#8b5cf6',
                target: 300
            }
        ];

        setPlayer({
            name: row['Player Name'],
            position: row['Position'] || "N/A",
            session: `${row['Session Type']} - ${row['Date']}`,
            photo: "/OIP.webp",
            _sources: row._sources || (row._source ? [row._source] : []),
            _raw: row._raw || {}
        });

        setMetrics(metricsMapping.map(m => ({
            ...m,
            trend: [m.value * 0.8, m.value * 0.9, m.value * 0.85, m.value]
        })));

        setLoading(false);
    }, [selectedPlayerName, allData, selectedDataView]);

    const handlePlayerChange = (name) => {
        setSelectedPlayerName(name);
        setSelectedMetric(null); // Clear detail view if switching
    };

    const handleCardClick = (metric) => {
        setSelectedMetric(metric);
    };

    const closeDetail = () => {
        setSelectedMetric(null);
    };

    if (loading) {
        return <div className="loading">Loading dashboard data...</div>;
    }

    if (!player && !loading) {
        return <div className="error">No player data found in CSV. Please check the file format.</div>;
    }

    return (
        <div className="app-container">
            <Header
                players={visiblePlayers}
                selectedPlayer={selectedPlayerName}
                onPlayerChange={handlePlayerChange}
                playerPhoto={player?.photo}
                dataFilter={dataFilter}
                onFilterChange={setDataFilter}
            />
            <main className="dashboard-content">
                {player && (
                    <>
                            <PlayerOverview player={player} selectedDataView={selectedDataView} onDataViewChange={setSelectedDataView} />
                        <DashboardGrid
                            metrics={metrics}
                            onCardClick={handleCardClick}
                            playerSources={player?._sources || (player?._source ? [player._source] : [])}
                        />
                    </>
                )}
            </main>
            {selectedMetric && (
                <Suspense fallback={<div className="loading">Loading detail…</div>}>
                    <DetailView
                        metric={selectedMetric}
                        onClose={closeDetail}
                    />
                </Suspense>
            )}
        </div>
    );
}

export default App;
