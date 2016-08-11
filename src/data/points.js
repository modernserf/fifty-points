export const takePoints = (fn) => (count) => {
  const points = []
  for (var i = 0; i < count; i++) {
    points.push([fn(), fn()])
  }
  return points
}

export function takePoisson (w, h, r) {
  const sample = poissonDisc(w, h, r)
  const points = []
  let count = 0

  while (true) {
    const s = sample()
    if (!s) { return { count, points } }
    count++
    const [x, y] = s
    points.push([x / w, y / h])
  }
}

// via https://bl.ocks.org/mbostock/19168c663618b7f07158
// Based on https://www.jasondavies.com/poisson-disc/
function poissonDisc (width, height, radius) {
  var k = 30, // maximum number of samples before rejection
      radius2 = radius * radius,
      R = 3 * radius2,
      cellSize = radius * Math.SQRT1_2,
      gridWidth = Math.ceil(width / cellSize),
      gridHeight = Math.ceil(height / cellSize),
      grid = new Array(gridWidth * gridHeight),
      queue = [],
      queueSize = 0,
      sampleSize = 0;

  return function() {
    if (!sampleSize) return sample(Math.random() * width, Math.random() * height);

    // Pick a random existing sample and remove it from the queue.
    while (queueSize) {
      var i = Math.random() * queueSize | 0,
          s = queue[i];

      // Make a new candidate between [radius, 2 * radius] from the existing sample.
      for (var j = 0; j < k; ++j) {
        var a = 2 * Math.PI * Math.random(),
            r = Math.sqrt(Math.random() * R + radius2),
            x = s[0] + r * Math.cos(a),
            y = s[1] + r * Math.sin(a);

        // Reject candidates that are outside the allowed extent,
        // or closer than 2 * radius to any existing sample.
        if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
          return sample(x, y);
        }
      }

      queue[i] = queue[--queueSize];
      queue.length = queueSize;
    }
  };

  function far(x, y) {
    var i = x / cellSize | 0,
        j = y / cellSize | 0,
        i0 = Math.max(i - 2, 0),
        j0 = Math.max(j - 2, 0),
        i1 = Math.min(i + 3, gridWidth),
        j1 = Math.min(j + 3, gridHeight);

    for (j = j0; j < j1; ++j) {
      var o = j * gridWidth;
      var s
      for (i = i0; i < i1; ++i) {
        if (s = grid[o + i]) { // eslint-disable-line no-cond-assign
          var dx = s[0] - x,
              dy = s[1] - y;
          if (dx * dx + dy * dy < radius2) return false;
        }
      }
    }

    return true;
  }

  function sample(x, y) {
    var s = [x, y];
    queue.push(s);
    grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = s;
    ++sampleSize;
    ++queueSize;
    return s;
  }
}

export function takeBestCandidate  (maxCount, w, h, maxSamples = 10) {
  const random = () =>  [Math.random() * w, Math.random() * h]
  const points = [random()]

  const distance = (a, b) => {
    const dx = a[0] - b[0]
    const dy = a[1] - b[1]
    return Math.sqrt(dx * dx + dy * dy)
  }

  // TODO: quadtree
  const findClosestDistance = (points, comp) => {
    let minDistance = distance(points[0], comp)
    for (let i = 1; i < points.length; i++) {
      const d = distance(points[i], comp)
      if (d < minDistance) {
        minDistance = d
      }
    }
    return minDistance
  }

  const sample = () => {
    let bestCandidate
    let bestDistance = 0
    for (let i = 0; i < maxSamples; ++i) {
      const c = random()
      const d = findClosestDistance(points, c)
      if (d > bestDistance) {
        bestDistance = d
        bestCandidate = c
      }
    }
    return bestCandidate
  }

  for (let i = 0; i < maxCount; i++) {
    points.push(sample())
  }

  return points.map(([x, y]) => [x / w, y / h])
}
