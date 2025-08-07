import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as streamingAvailability from "streaming-availability";
import "./DetailsPage.css";
import { Icon } from "@iconify/react";

const DetailsPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [soundtracks, setSoundtracks] = useState(null);
  const [soundtrackLoading, setSoundtrackLoading] = useState(false);
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const platformIconMap = {
    Netflix: "simple-icons:netflix",
    "Prime Video": "simple-icons:primevideo",
    Max: "simple-icons:max",
    Hulu: "simple-icons:hulu",
    "Disney+": "simple-icons:disneyplus",
    "Apple TV+": "simple-icons:appletvplus",
    "Paramount+": "simple-icons:paramountplus",
    Peacock: "simple-icons:peacock",
    "Discovery+": "simple-icons:discoveryplus",

    Crunchyroll: "simple-icons:crunchyroll",
    Funimation: "simple-icons:funimation",
    VRV: "simple-icons:vrv",
    Hoopla: "simple-icons:hoopla",
    Kanopy: "simple-icons:kanopy",
    Tubi: "simple-icons:tubi",
    "Pluto TV": "simple-icons:plutotv",

    Freevee: "simple-icons:amazonprimevideo", // Freevee is an Amazon service
    "Roku Channel": "simple-icons:roku",

    Vudu: "simple-icons:vudu",
    Redbox: "simple-icons:redbox",
    "Google Play Movies & TV": "simple-icons:googleplay",
    YouTube: "simple-icons:youtube",

    Viaplay: "simple-icons:viaplay",
    "Now TV": "simple-icons:nowtv",
    "Sky Go": "simple-icons:sky",
    "BBC iPlayer": "simple-icons:bbciplayer",
    ITVX: "simple-icons:itv",
    "All 4": "simple-icons:channel4",
    My5: "simple-icons:channel5",
    "Rai Play": "simple-icons:raiplay",
    Salto: "simple-icons:salto",
    "Molotov TV": "simple-icons:molotovtv",
    Zattoo: "simple-icons:zattoo",
    Joyn: "simple-icons:joyn",
    TVNOW: "simple-icons:rtl", // TVNOW is now RTL+
    MagentaTV: "simple-icons:telekom",
    "Waipu.tv": "simple-icons:waiputv",
    Videoland: "simple-icons:videoland",
    "NPO Start": "simple-icons:npo",
    "Ziggo GO": "simple-icons:ziggo",
    "Pathé Thuis": "simple-icons:pathe",
    "Cineplex Store": "simple-icons:cineplex",
    Crave: "simple-icons:crave",
    "Club Illico": "simple-icons:clubillico",
    "Tou.tv": "simple-icons:toutv",
    "CBC Gem": "simple-icons:cbc",
    Citytv: "simple-icons:citytv",
    "Global TV": "simple-icons:globaltv",
    CTV: "simple-icons:ctv",
    "TVNZ OnDemand": "simple-icons:tvnz",
    ThreeNow: "simple-icons:threenow",
    Neon: "simple-icons:neon",
    Binge: "simple-icons:binge",
    Stan: "simple-icons:stan",
    "Foxtel Now": "simple-icons:foxtel",
    "Kayo Sports": "simple-icons:kayosports",
    DocPlay: "simple-icons:docplay",
    "ABC iview": "simple-icons:abc",
    "SBS On Demand": "simple-icons:sbsondemand",
    "10 Play": "simple-icons:channel10",
    "9Now": "simple-icons:channel9",
    TVING: "simple-icons:tving",
    Wavve: "simple-icons:wavve",
    Watcha: "simple-icons:watcha",
    "Coupang Play": "simple-icons:coupang",
    Seezn: "simple-icons:seezn",
    Viu: "simple-icons:viu",
    iQIYI: "simple-icons:iqiyi",
    WeTV: "simple-icons:wetv",
    TrueID: "simple-icons:trueid",
    "Catchplay+": "simple-icons:catchplay",
    MeWatch: "simple-icons:mewatch",
    Toggle: "simple-icons:toggle",
    Vidio: "simple-icons:vidio",
    Genflix: "simple-icons:genflix",
    Maxstream: "simple-icons:maxstream",
    "Cignal Play": "simple-icons:cignalplay",
    iflix: "simple-icons:iflix",
    "Dimsum Entertainment": "simple-icons:dimsum",
    ViuTV: "simple-icons:viutv",
    "myTV SUPER": "simple-icons:mytvsuper",
    "Now E": "simple-icons:nowe",
    "ViuTV Free": "simple-icons:viutv",
    "TVB Anywhere": "simple-icons:tvb",
    "Netflix basic with ads": "simple-icons:netflix",
    "Netflix standard with ads": "simple-icons:netflix",
    "Netflix premium": "simple-icons:netflix",
    "Netflix standard": "simple-icons:netflix",
    "Netflix basic": "simple-icons:netflix",
    "Amazon Prime Video": "simple-icons:primevideo",
    "Apple iTunes": "simple-icons:itunes",
    "Google Play Movies": "simple-icons:googleplay",

    "Microsoft Store": "simple-icons:microsoft",
    "Rakuten TV": "simple-icons:rakutentv",
    Chili: "simple-icons:chili",
    Plex: "simple-icons:plex",
    "Curiosity Stream": "simple-icons:curiositystream",
    Mubi: "simple-icons:mubi",
    "DocAlliance Films": "simple-icons:docalliancefilms",
    Filmzie: "simple-icons:filmzie",
    Spamflix: "simple-icons:spamflix",
    "True Story": "simple-icons:truestory",
    Classix: "simple-icons:classix",

    BroadwayHD: "simple-icons:broadwayhd",
    "Marquee TV": "simple-icons:marqueetv",
    Cineverse: "simple-icons:cineverse",
    Fandor: "simple-icons:fandor",
    Screambox: "simple-icons:screambox",
    "Hi-YAH!": "simple-icons:hiyah",
    AsianCrush: "simple-icons:asiancrush",
    "Midnight Pulp": "simple-icons:midnightpulp",
    Cultpix: "simple-icons:cultpix",
    DocuBay: "simple-icons:docubay",
    "Magellan TV": "simple-icons:magellantv",
    "History Vault": "simple-icons:history",
    "A&E Crime Central": "simple-icons:aetv",
    "Lifetime Movie Club": "simple-icons:lifetime",
    "Hallmark Movies Now": "simple-icons:hallmarkchannel",
    "UP Faith & Family": "simple-icons:upfaithandfamily",
    "Pure Flix": "simple-icons:pureflix",
    "Dove Channel": "simple-icons:dovechannel",
    "BYU TV": "simple-icons:byutv",
    Gaia: "simple-icons:gaia",
    ConTV: "simple-icons:contv",
    Revry: "simple-icons:revry",
    "Here TV": "simple-icons:heretv",
    Outfest: "simple-icons:outfest",
    Tello: "simple-icons:tello",
    Dekkoo: "simple-icons:dekkoo",
    Kocowa: "simple-icons:kocowa",
    Viki: "simple-icons:viki",
    DramaFever: "simple-icons:dramafever",
    "Netflix Kids": "simple-icons:netflix",
    "YouTube Kids": "simple-icons:youtube",
    "PBS Kids": "simple-icons:pbs",
    Noggin: "simple-icons:noggin",
    NickHits: "simple-icons:nick",
    Boomerang: "simple-icons:boomerang",
    "Cartoon Network": "simple-icons:cartoonnetwork",
    "Adult Swim": "simple-icons:adultswim",
    "Comedy Central": "simple-icons:comedycentral",
    MTV: "simple-icons:mtv",
    VH1: "simple-icons:vh1",
    "BET+": "simple-icons:betplus",
    "TV One": "simple-icons:tvone",
    "Bounce TV": "simple-icons:bouncetv",
    ALLBLK: "simple-icons:allblk",
    UMC: "simple-icons:umc",
    "Brown Sugar": "simple-icons:brownsugar",

    "Sundance Now": "simple-icons:sundancenow",
    "IFC Films Unlimited": "simple-icons:ifcfilms",
    Topic: "simple-icons:topic",
    "Acorn TV": "simple-icons:acorntv",
    BritBox: "simple-icons:britbox",
    Shudder: "simple-icons:shudder",
    "AMC+": "simple-icons:amcplus",

    Epix: "simple-icons:epix",

    Cinemax: "simple-icons:cinemax",
    "Hulu with Live TV": "simple-icons:hulu",
    "YouTube TV": "simple-icons:youtubetv",
    "Sling TV": "simple-icons:sling",
    FuboTV: "simple-icons:fubotv",

    "DirecTV Stream": "simple-icons:directv",
    "Xfinity Stream": "simple-icons:xfinity",
    "Spectrum TV": "simple-icons:spectrum",
    "Optimum TV": "simple-icons:optimum",
    "Cox Contour TV": "simple-icons:cox",
    "Verizon Fios TV": "simple-icons:verizon",
    "Dish Anywhere": "simple-icons:dish",
    "Sling Orange": "simple-icons:sling",
    "Sling Blue": "simple-icons:sling",
    "Sling Orange + Blue": "simple-icons:sling",
    Philo: "simple-icons:philo",
    "Frndly TV": "simple-icons:frndlytv",
    Vidgo: "simple-icons:vidgo",
    "AT&T TV Now": "simple-icons:att",
    TVision: "simple-icons:tmobile",
    "Plex Live TV": "simple-icons:plex",
    "Pluto TV Live": "simple-icons:plutotv",
    "Tubi Live TV": "simple-icons:tubi",
    Xumo: "simple-icons:xumo",
    "Peacock TV": "simple-icons:peacock",
    "Paramount+ with Showtime": "simple-icons:paramountplus",
    "Discovery+ Ad-Free": "simple-icons:discoveryplus",
    "Max Ad-Free": "simple-icons:max",
    "Hulu (No Ads)": "simple-icons:hulu",
    "Disney+ (No Ads)": "simple-icons:disneyplus",
    "ESPN+": "simple-icons:espn",
    "Bundle: Disney+, Hulu, ESPN+": "simple-icons:disneyplus",
    "Apple One": "simple-icons:apple",
    "Amazon Prime": "simple-icons:amazonprime",
    "YouTube Premium": "simple-icons:youtube",
    "Spotify Premium": "simple-icons:spotify",
    "Apple Music": "simple-icons:applemusic",
    Tidal: "simple-icons:tidal",
    Deezer: "simple-icons:deezer",
    "Pandora Premium": "simple-icons:pandora",
    SiriusXM: "simple-icons:siriusxm",
    Audible: "simple-icons:audible",
    "Kindle Unlimited": "simple-icons:kindle",
    "ComiXology Unlimited": "simple-icons:comixology",
    "Marvel Unlimited": "simple-icons:marvel",
    "DC Universe Infinite": "simple-icons:dccomics",
    "Nintendo Switch Online": "simple-icons:nintendo",
    "PlayStation Plus": "simple-icons:playstation",
    "Xbox Game Pass": "simple-icons:xbox",
    "EA Play": "simple-icons:ea",
    "Ubisoft+": "simple-icons:ubisoft",
    "Google Play Pass": "simple-icons:googleplay",
    "Apple Arcade": "simple-icons:applearcade",
    "Netflix Games": "simple-icons:netflix",
    "Amazon Luna": "simple-icons:amazonluna",
    "Google Stadia": "simple-icons:googlestadia",
    "Nvidia GeForce Now": "simple-icons:nvidia",
    Shadow: "simple-icons:shadow",
    Boosteroid: "simple-icons:boosteroid",
    "Antstream Arcade": "simple-icons:antstreamarcade",
    Utomik: "simple-icons:utomik",
    Blacknut: "simple-icons:blacknut",
    GameFly: "simple-icons:gamefly",
    "Humble Bundle": "simple-icons:humblebundle",
    "Itch.io": "simple-icons:itchdotio",
    "GOG.com": "simple-icons:gogdotcom",
    "Epic Games Store": "simple-icons:epicgames",
    Steam: "simple-icons:steam",
    Origin: "simple-icons:ea",
    "Battle.net": "simple-icons:blizzard",
    "Rockstar Games Launcher": "simple-icons:rockstargames",
    "Ubisoft Connect": "simple-icons:ubisoft",
    "Xbox App": "simple-icons:xbox",
    "PlayStation App": "simple-icons:playstation",
    "Nintendo Switch Online App": "simple-icons:nintendo",
    "Google Play Store": "simple-icons:googleplay",
    "Apple App Store": "simple-icons:apple",
    "Amazon Appstore": "simple-icons:amazon",
    "Samsung Galaxy Store": "simple-icons:samsung",
    "Huawei AppGallery": "simple-icons:huawei",
    "Xiaomi GetApps": "simple-icons:xiaomi",
    "Oppo App Market": "simple-icons:oppo",
    "Vivo App Store": "simple-icons:vivo",
    "Realme App Market": "simple-icons:realme",
    "OnePlus Appstore": "simple-icons:oneplus",
    "LG Content Store": "simple-icons:lg",
    "Samsung Smart TV Apps": "simple-icons:samsung",
    "Roku Channel Store": "simple-icons:roku",
    "Amazon Fire TV Appstore": "simple-icons:amazonfiretv",
    "Android TV Google Play": "simple-icons:android",
    "Apple TV App Store": "simple-icons:appletv",
    "Chromecast with Google TV": "simple-icons:google",
    "Nvidia Shield TV": "simple-icons:nvidia",
    "Xiaomi Mi Box": "simple-icons:xiaomi",
    Formuler: "simple-icons:formuler",
    Dreamlink: "simple-icons:dreamlink",
    "Mag Box": "simple-icons:magisk",
    Infomir: "simple-icons:infomir",
    Zidoo: "simple-icons:zidoo",
    "Dune HD": "simple-icons:dune",
    Zappiti: "simple-icons:zappiti",
    Egreat: "simple-icons:egreat",
    Himedia: "simple-icons:himedia",
    Beelink: "simple-icons:beelink",
    Minix: "simple-icons:minix",
    Ugoos: "simple-icons:ugoos",
    Mecool: "simple-icons:mecool",
    Amlogic: "simple-icons:aml",
    Rockchip: "simple-icons:rockchip",
    Allwinner: "simple-icons:allwinner",
    Realtek: "simple-icons:realtek",
    Hisilicon: "simple-icons:hisilicon",
    Broadcom: "simple-icons:broadcom",
    Qualcomm: "simple-icons:qualcomm",
    Intel: "simple-icons:intel",
    AMD: "simple-icons:amd",
    Nvidia: "simple-icons:nvidia",
    "Raspberry Pi": "simple-icons:raspberrypi",
    Arduino: "simple-icons:arduino",
    ESP32: "simple-icons:espressif",
    ESP8266: "simple-icons:espressif",
    STM32: "simple-icons:stmicroelectronics",
    Microchip: "simple-icons:microchip",
    "Texas Instruments": "simple-icons:texasinstruments",
    NXP: "simple-icons:nxp",
    Infineon: "simple-icons:infineon",
    Renesas: "simple-icons:renesas",
    Toshiba: "simple-icons:toshiba",
    Sony: "simple-icons:sony",
    Panasonic: "simple-icons:panasonic",
    Sharp: "simple-icons:sharp",
    Philips: "simple-icons:philips",
    Bosch: "simple-icons:bosch",
    Siemens: "simple-icons:siemens",
    ABB: "simple-icons:abb",
    "Schneider Electric": "simple-icons:schneider-electric",
    "General Electric": "simple-icons:generalelectric",
    Honeywell: "simple-icons:honeywell",
    Daikin: "simple-icons:daikin",
    "Mitsubishi Electric": "simple-icons:mitsubishielectric",
    "LG Electronics": "simple-icons:lg",
    "Samsung Electronics": "simple-icons:samsung",
    "Sony Electronics": "simple-icons:sony",
    "Panasonic Corporation": "simple-icons:panasonic",
    "Sharp Corporation": "simple-icons:sharp",
    "Philips N.V.": "simple-icons:philips",
    "Bosch Group": "simple-icons:bosch",
    "Siemens AG": "simple-icons:siemens",
    "ABB Ltd": "simple-icons:abb",
    "Schneider Electric SE": "simple-icons:schneider-electric",
    "General Electric Company": "simple-icons:generalelectric",
    "Honeywell International Inc.": "simple-icons:honeywell",
    "Daikin Industries, Ltd.": "simple-icons:daikin",
    "Mitsubishi Electric Corporation": "simple-icons:mitsubishielectric",
  };

  //*******Music section
  const fetchSoundtrackFromMusicBrainz = async (movieTitle) => {
    try {
      const searchQueries = [
        `"${movieTitle}" soundtrack`,
        `"${movieTitle}" original motion picture soundtrack`,
        `${movieTitle.replace(/[^\w\s]/gi, "")} soundtrack`,
      ];

      let bestRelease = null;

      for (const query of searchQueries) {
        const searchResponse = await fetch(
          `https://musicbrainz.org/ws/2/release?query=${encodeURIComponent(
            query
          )}&fmt=json&limit=10`
        );
        const searchData = await searchResponse.json();

        if (searchData.releases && searchData.releases.length > 0) {
          bestRelease =
            searchData.releases.find(
              (release) =>
                release.title.toLowerCase().includes("soundtrack") &&
                release.title.toLowerCase().includes(movieTitle.toLowerCase())
            ) || searchData.releases[0];

          if (bestRelease) break;
        }
      }

      if (bestRelease) {
        const detailResponse = await fetch(
          `https://musicbrainz.org/ws/2/release/${bestRelease.id}?inc=recordings+artist-credits&fmt=json`
        );
        const detailData = await detailResponse.json();

        return {
          album: {
            name: bestRelease.title,
            artist: bestRelease["artist-credit"]
              ? bestRelease["artist-credit"][0].name
              : "Various Artists",
            year: bestRelease.date
              ? new Date(bestRelease.date).getFullYear()
              : null,
            mbid: bestRelease.id,
            country: bestRelease.country || null,
          },
          tracks:
            detailData.media && detailData.media[0]
              ? detailData.media[0].tracks
              : [],
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching from MusicBrainz:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch movie details from OMDB API
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }`
        );
        const data = await response.json();
        setMovieDetails(data);

        //
        if (data && data.Title) {
          setSoundtrackLoading(true);
          fetchSoundtrackFromMusicBrainz(data.Title)
            .then((soundtrackData) => {
              setSoundtracks(soundtrackData);
            })
            .catch((error) => {
              console.error("Error fetching soundtrack:", error);
            })
            .finally(() => {
              setSoundtrackLoading(false);
            });
        }

        // Fetch streaming availability
        const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
        if (RAPID_API_KEY && data.imdbID) {
          const client = new streamingAvailability.Client(
            new streamingAvailability.Configuration({
              apiKey: RAPID_API_KEY,
            })
          );
          try {
            // Get user's current location
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                // A reverse geocoding API would be needed here to convert lat/long to country code.
                const countryCode = "us"; // Use lowercase country code for API compatibility
                fetchShowData(countryCode);
              },
              (error) => {
                console.warn(
                  "Could not retrieve user location, defaulting to US data.",
                  error
                ); // User denied geolocation or an error occurred, fallback to 'us'
                // Fallback to a default country if location cannot be obtained
                fetchShowData("us"); // Fallback to lowercase country code
              }
            );

            async function fetchShowData(countryCode) {
              const show = await client.showsApi.getShow({
                id: data.imdbID,
                country: countryCode,
              });

              if (
                show &&
                show.streamingOptions &&
                show.streamingOptions[countryCode.toLowerCase()]
              ) {
                const uniquePlatforms = Array.from(
                  new Map(
                    show.streamingOptions[countryCode.toLowerCase()].map(
                      (option) => [
                        option.service.name,
                        {
                          name: option.service.name,
                          icon: option.service.icon,
                          url: option.link,
                        },
                      ]
                    )
                  ).values()
                );
                setStreamingPlatforms(uniquePlatforms);
              } else {
                setStreamingPlatforms([]); // Clear platforms if no data for the country
              }
            }
          } catch (streamingError) {
            console.error(
              "Error fetching streaming availability:",
              streamingError
            );
          }
        }

        // Fetch soundtrack data (to be implemented with Spotify API)
        // const tracks = await fetchSoundtracks(data.Title);
        // setSoundtracks(tracks);

        setLoading(false);
        setHasLoaded(true);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  useEffect(() => {
    if (movieDetails) {
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      const isInWatchlist = watchlist.some(
        (movie) => movie.imdbID === movieDetails.imdbID
      );
      setIsWatchlisted(isInWatchlist);
    }
  }, [movieDetails]);

  const handleWatchlistToggle = () => {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (isWatchlisted) {
      // Remove from watchlist
      watchlist = watchlist.filter(
        (movie) => movie.imdbID !== movieDetails.imdbID
      );
      alert(`${movieDetails.Title} removed from watchlist!`);
    } else {
      // Add to watchlist
      watchlist.push({
        imdbID: movieDetails.imdbID,
        Title: movieDetails.Title,
        Poster: movieDetails.Poster,
      });
      alert(`${movieDetails.Title} added to watchlist!`);
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    setIsWatchlisted(!isWatchlisted);
  };

  // The streamingPlatforms state will now be populated by the API call

  if (loading) return <div className="spinner">Loading...</div>;
  if (!movieDetails)
    return <div className="error">Failed to load details.</div>;

  return (
    <div className="details-page bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Blurred Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
          style={{
            backgroundImage: `url(${
              movieDetails.Poster && movieDetails.Poster !== "N/A"
                ? movieDetails.Poster
                : ""
            })`,
            filter: "blur(10px) brightness(0.5)",
            transform: "scale(1.15)",
          }}
        />
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-violet-900/80 opacity-90" />
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Poster Card */}
          <div className="w-72 shrink-0 rounded-lg shadow-2xl ring-1 ring-white/20 backdrop-blur-md bg-white/10 p-4 relative overflow-hidden">
            <img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Faint inner glow */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ boxShadow: "inset 0 0 20px rgba(255,255,255,0.1)" }}
            ></div>
          </div>

          {/* Movie Details */}
          <div className="flex-1 text-center sm:text-left flex flex-col justify-center items-center md:items-start">
            {/* Title */}
            <h1
              className={`text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight transition-opacity duration-1000 ${
                hasLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              {movieDetails.Title}
            </h1>
            {/* Pill Badges */}
            <div className="flex flex-wrap gap-4 text-lg text-gray-300 mb-6 justify-center md:justify-start">
              <span className="px-3 py-1 rounded-full border border-white/30 bg-white/10 text-sm">
                {movieDetails.Year}
              </span>
              <span className="px-3 py-1 rounded-full border border-white/30 bg-white/10 text-sm">
                {movieDetails.Runtime}
              </span>
              <span className="px-3 py-1 rounded-full border border-white/30 bg-white/10 text-sm">
                {movieDetails.Rated}
              </span>
            </div>
            {/* Plot */}
            <p className="plot-text">{movieDetails.Plot}</p>

            {/* IMDb Rating Badge */}
            {movieDetails.imdbRating && movieDetails.imdbRating !== "N/A" && (
              <div className="flex items-center gap-2 mb-6 p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600  text-white shadow-lg">
                <Icon icon="mdi:star" className="w-6 h-6" />
                <span className="font-bold text-md px-1.5">
                  {movieDetails.imdbRating}
                </span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  movieDetails.Title + " trailer"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 border border-white/30 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 gradient-button-transition"
              >
                <Icon
                  icon="mdi:play-circle"
                  className="inline-block w-5 h-5 mr-2"
                />
                Watch Trailer
              </a>
              <button
                onClick={handleWatchlistToggle}
                className="flex-1 p-3 border border-white/30 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white/10"
              >
                <Icon
                  icon={isWatchlisted ? "mdi:check-circle" : "mdi:plus-circle"}
                  className="inline-block w-5 h-5 mr-2"
                />
                {isWatchlisted ? "Watchlisted" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Movie Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-yellow-500 mb-2">
                  {movieDetails.imdbRating}
                </div>
                <div className="text-sm text-gray-200">IMDb Rating</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {movieDetails.Metascore}
                </div>
                <div className="text-sm text-gray-200">Metascore</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-cyan-200 mb-2">
                  {movieDetails.Runtime}
                </div>
                <div className="text-sm text-gray-200">Duration</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-purple-300 mb-2">
                  {movieDetails.Year}
                </div>
                <div className="text-sm text-gray-200">Release Year</div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">Movie Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm uppercase text-gray-400 mb-2">
                      Director
                    </h4>
                    <p className="text-gray-200 text-lg">
                      {movieDetails.Director}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase text-gray-400 mb-2">
                      Writers
                    </h4>
                    <p className="text-gray-200 text-lg">
                      {movieDetails.Writer}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase text-gray-400 mb-2">
                      Genre
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {movieDetails.Genre.split(", ").map((genre, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase text-gray-400 mb-2">
                      Awards
                    </h4>
                    <p className="text-gray-200 text-lg">
                      {movieDetails.Awards}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cast Section */}
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movieDetails.Actors.split(", ").map((actor, index) => (
                  <div key={index} className="group text-center">
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        actor + " actor"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-3 px-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 group-hover:transform group-hover:scale-105"
                    >
                      <h3 className="text-base md:text-lg font-medium text-white group-hover:text-cyan-500 transition-colors duration-300">
                        {actor}
                      </h3>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ratings & Watch Section */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6">Ratings</h3>
              <div className="space-y-4">
                {movieDetails.Ratings.map((rating, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                  >
                    <span className="text-gray-300">{rating.Source}</span>
                    <span className="text-lg font-semibold text-white">
                      {rating.Value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Watch Now Section */}
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6">Watch Now</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {streamingPlatforms.length > 0 ? (
                  streamingPlatforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center justify-center p-2.5 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-300 transform hover:scale-105"
                    >
                      <Icon
                        icon={platformIconMap[platform.name] || "mdi:web"}
                        className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="text-lg text-gray-200 group-hover:text-purple-400 transition-colors text-center">
                        {platform.name}
                      </span>
                    </a>
                  ))
                ) : (
                  <p className="text-gray-400">No streaming platforms found.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MusicBrainz Soundtrack Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8 flex items-center">
            <Icon
              icon="mdi:music-note"
              className="w-8 h-8 mr-3 text-blue-500"
            />
            Original Motion Picture Soundtrack
          </h2>

          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            {soundtrackLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-300">
                  Loading soundtrack...
                </span>
              </div>
            ) : soundtracks ? (
              <div>
                {/* Album Header */}
                <div className="flex items-start gap-6 mb-8 pb-6 border-b border-gray-700/50">
                  <div className="w-32 h-32 bg-gray-700/50 rounded-lg flex items-center justify-center overflow-hidden">
                    {movieDetails.Poster && movieDetails.Poster !== "N/A" ? (
                      <img
                        src={movieDetails.Poster}
                        alt={movieDetails.Title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon
                        icon="mdi:album"
                        className="w-16 h-16 text-gray-200"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {soundtracks.album.name}
                    </h3>
                    <p className="text-gray-300 font-bold  mb-2">
                      by {soundtracks.album.artist}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-yellow-50 mb-4">
                      {soundtracks.album.year && (
                        <span>Released: {soundtracks.album.year}</span>
                      )}
                      {soundtracks.album.country && (
                        <>
                          <span>•</span>
                          <span>{soundtracks.album.country}</span>
                        </>
                      )}
                      {soundtracks.tracks.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{soundtracks.tracks.length} tracks</span>
                        </>
                      )}
                    </div>
                    <a
                      href={`https://musicbrainz.org/release/${soundtracks.album.mbid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-cyan-600 rounded-full text-white font-medium transition-colors duration-300"
                    >
                      <Icon icon="mdi:open-in-new" className="w-4 h-4 mr-2" />
                      View on MusicBrainz
                    </a>
                  </div>
                </div>

                {/* Track Listing */}
                {soundtracks.tracks && soundtracks.tracks.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Track Listing
                    </h4>
                    {(showAllTracks
                      ? soundtracks.tracks
                      : soundtracks.tracks.slice(0, 5)
                    ).map((track, index) => (
                      <div
                        key={track.id || index}
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
                      >
                        <div className="flex items-center flex-1">
                          <span className="text-gray-400 text-sm w-8">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="ml-4 flex-1 flex items-center">
                            <a
                              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                                track.title + " " + movieDetails.Title
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-white group-hover:text-purple-400 transition-colors mr-2"
                            >
                              {track.title}
                            </a>
                            <a
                              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                                track.title + " " + movieDetails.Title
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Icon
                                icon="simple-icons:youtube"
                                className="w-4 h-4 text-red-500 hover:text-red-400"
                              />
                            </a>
                          </div>

                          <div className="track-artist text-gray-300 text-xs sm:text-sm leading-tight break-words overflow-hidden text-ellipsis line-clamp-1 pr-2 max-w-[120px] sm:max-w-[150px] min-w-0">
                            {track.recording &&
                            track.recording["artist-credit"] &&
                            track.recording["artist-credit"][0]
                              ? track.recording["artist-credit"][0].name
                              : "Unknown Artist"}
                          </div>
                        </div>
                        <div className="track-duration text-gray-400 text-xs sm:text-sm text-right whitespace-nowrap min-w-[4ch] flex-shrink-0 ml-auto">
                          {track.length && (
                            <>
                              {Math.floor(track.length / 60000)}:
                              {String(
                                Math.floor((track.length % 60000) / 1000)
                              ).padStart(2, "0")}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    {soundtracks.tracks.length > 5 && (
                      <button
                        onClick={() => setShowAllTracks(!showAllTracks)}
                        className="mt-4 w-full py-2 px-4 bg-cyan-600 hover:bg-purple-600 rounded-lg text-white font-medium transition-colors duration-300 cursor-pointer"
                      >
                        {showAllTracks ? "View Less" : "View More"}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon
                      icon="mdi:music-off"
                      className="w-12 h-12 text-gray-600 mx-auto mb-4"
                    />
                    <p className="text-gray-400 text-lg">
                      No track listing available
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Album found but track details are not available in the
                      database
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon
                  icon="mdi:music-off"
                  className="w-16 h-16 text-gray-600 mx-auto mb-4"
                />
                <p className="text-gray-400 text-lg mb-4">
                  No official soundtrack found
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Search for "{movieDetails.Title} soundtrack" on your preferred
                  music platform
                </p>

                {/* Fallback Search Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      movieDetails.Title + " soundtrack"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors"
                  >
                    <Icon
                      icon="simple-icons:youtube"
                      className="w-8 h-8 text-red-500 mb-2"
                    />
                    <span className="text-sm text-white">YouTube</span>
                  </a>

                  <a
                    href={`https://open.spotify.com/search/${encodeURIComponent(
                      movieDetails.Title + " soundtrack"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-colors"
                  >
                    <Icon
                      icon="simple-icons:spotify"
                      className="w-8 h-8 text-green-500 mb-2"
                    />
                    <span className="text-sm text-white">Spotify</span>
                  </a>

                  <a
                    href={`https://music.apple.com/search?term=${encodeURIComponent(
                      movieDetails.Title + " soundtrack"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
                  >
                    <Icon
                      icon="simple-icons:applemusic"
                      className="w-8 h-8 text-white mb-2"
                    />
                    <span className="text-sm text-white">Apple Music</span>
                  </a>

                  <a
                    href={`https://musicbrainz.org/search?query=${encodeURIComponent(
                      movieDetails.Title + " soundtrack"
                    )}&type=release`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                  >
                    <Icon
                      icon="mdi:database"
                      className="w-8 h-8 text-blue-500 mb-2"
                    />
                    <span className="text-sm text-white">MusicBrainz</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
