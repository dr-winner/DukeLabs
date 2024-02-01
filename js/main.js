console.log("Hello from DukeLabs");
/*--- Constants Section ----*/

const LB_PER_KG = 2.2;
const MILLI_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;

/* --- Objects Section ---*/
// Create Experiment objects
let experiment1 = {
    id: 101,
    task: "Measure Height",
    budget: 133.45,
    startTime: new Date(2022,3,16,6,7),
    complete: false
};

let experiment2 = {
    id: 102,
    task: "Measure Length",
    budget: 321.54,
    startTime: new Date(2022,4,1,14,30),
    endtTime: new Date(2022,4,2,21,12),
    complete: true
};

// Create Measurement objects
let measurement1 = {
    id: 1,
    unit: "kg",
    value: 42,
    time: "PT2M12S"
};

let measurement2 = {
    id: 2,
    unit: "kg",
    value: 40,
    time: "PT3M10S"
};

let measurement3 = {
    id: 3,
    unit: "kg",
    value: 3,
    time: "PT3M55S"
};

let measurement4 = {
    id: 4,
    unit: "m",
    value: 12,
    time: "PT20M"
};

let measurement5 = {
    id: 5,
    unit: "m",
    value: 10,
    time: "PT1H20M10S"
};

// Create and populate an array of measurement objects
let measurement = [measurement1, measurement2, measurement3];

/*--- Functions Section ---*/

// Convert between pounds and kilograms
function lb2kg(lb) {
    return lb / LB_PER_KG
}

function kg2lb(kg) {
    return kg * LB_PER_KG
}

// parse duration from ISO format "PT<hours>H<minutes>M<seconds>S"
// to milliseconds
function parseDuration(duration) {
    let durationPattern = /PT(?:([..\d]+)M)?(?:([..\d]+)S)?/;
    let matches = duration.match(durationPattern);
    let hours = (matches[1] === undefined) ? 0 : matches[1];
    let minutes = (matches[2] === undefined) ? 0 : matches[2];
    let seconds = (matches[3] === undefined) ? 0 : matches[3];
    return (parseInt(hours)*SECONDS_PER_HOUR+
            parseInt(minutes)*SECONDS_PER_MINUTE+
            parseInt(seconds))*MILLI_PER_SECOND;
}

// format duration from milliseconds into ISO format as 
// "PT<hours>H<minutes>M<seconds>S"
function formatDuration(duration) {
    if (duration === 0) {
        return "PT0S";
    }
    let totalSeconds = Math.trunc(duration/MILLI_PER_SECOND);
    let hours = Math.trunc((totalSeconds / SECONDS_PER_HOUR) /
                            SECONDS_PER_MINUTE);
    let seconds = Math.trunc(totalSeconds % SECONDS_PER_MINUTE)
    let result = "PT";
    if (hours != 0) {
        result += hours+"H";
    }
    if (minutes != 0) {
        result += minutes+"M";
    }
    if (seconds != 0) {
        result += seconds+"S";
    }
    return result;
}

/* --- Test Sectiion --- */
// Convert betwwen kilograns and pounds
let lb = kg2lb(measurement1.value);
let kg = lb2kg(lb);
console.log("Pounds: "+lb+ " Kilograms: "+kg);

// Parse and format duration milliseconds and string representation
let durationMS = parseDuration(measurement3.time);
console.log("Measurement time offset from the start  of the experiment: "+durationMS);

// Calculate measurement time
let MeasurementTime = experiment2.startTime.getTime()+durationMS;
console.log("Measurement time: "+new Date(MeasurementTime));

// Calculate experiment duration
let durationTime = formatDuration(experiment2.endtTime-experiment2.startTime);
console.log("Experiment duration: "+durationTime);