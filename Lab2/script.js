// ===============================
// LAB 2 — Part 1
// без ES6 класів
// ===============================

const car1 = new Object();

car1.color = "pink";
car1.maxSpeed = 220;

car1.driver = new Object();
car1.driver.name = "Oksana Prokhyra";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";

car1.tuning = true;
car1["number of accidents"] = 0;

console.log("car1 =", car1);

const car2 = {
    color: "white",
    maxSpeed: 180,
    driver: {
        name: "Oksana Prokhyra",
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2
};

console.log("car2 =", car2);

car1.drive = function () {
    console.log("I am not driving at night");
};

console.log("car1.drive():");
car1.drive();

car2.drive = function () {
    console.log("I can drive anytime");
};

console.log("car2.drive():");
car2.drive();

function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    this.trip = function () {
        if (!this.driver) {
            console.log("No driver assigned");
            return;
        }

        const nightText =
            this.driver.nightDriving
                ? "drives at night"
                : "does not drive at night";

        console.log(
            `Driver ${this.driver.name} ${nightText} and has ${this.driver.experience} years of experience`
        );
    };
}

Truck.prototype.AssignDriver = function (
    name,
    nightDriving,
    experience
) {
    this.driver = {
        name: name,
        nightDriving: Boolean(nightDriving),
        experience: parseInt(experience, 10)
    };
};

const truck1 = new Truck("blue", 8000, 75.5, "Volvo", "FH16");
const truck2 = new Truck("red", 6500, 68.2, "MAN", "TGX");

truck1.AssignDriver("Milana Skylska", true, 5);
truck2.AssignDriver("Sam Smith", false, 2);

console.log("truck1.trip():");
truck1.trip();

// ===============================
// PART 2 — ES6 класи
// ===============================

const deg2rad = (deg) => deg * Math.PI / 180;

class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square: 4 equal sides, 4 right angles (90°).");
    }

    length() {
        console.log("Perimeter:", 4 * this.a);
    }

    square() {
        console.log("Area:", this.a * this.a);
    }

    info() {
        console.log(`${this.constructor.name} info:`);
        console.log("Sides:", this.a, this.a, this.a, this.a);
        console.log("Angles:", 90, 90, 90, 90);
        console.log("Perimeter:", 4 * this.a);
        console.log("Area:", this.a * this.a);
    }
}

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Rectangle: opposite sides equal, all angles 90°.");
    }

    length() {
        console.log("Perimeter:", 2 * (this.a + this.b));
    }

    square() {
        console.log("Area:", this.a * this.b);
    }

    info() {
        console.log("Rectangle info:");
        console.log("Sides:", this.a, this.b, this.a, this.b);
        console.log("Angles:", 90, 90, 90, 90);
        console.log("Perimeter:", 2 * (this.a + this.b));
        console.log("Area:", this.a * this.b);
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Rhombus: 4 equal sides, opposite angles equal.");
    }

    square() {
        console.log(
            "Area:",
            this.a * this.a * Math.sin(deg2rad(this.alpha))
        );
    }

    info() {
        console.log("Rhombus info:");
        console.log("Sides:", this.a, this.a, this.a, this.a);
        console.log(
            "Angles:",
            this.alpha,
            this.beta,
            this.alpha,
            this.beta
        );
        console.log("Perimeter:", 4 * this.a);
        console.log(
            "Area:",
            this.a * this.a * Math.sin(deg2rad(this.alpha))
        );
    }

    get side() {
        return this.a;
    }

    set side(v) {
        this.a = v;
    }

    get obtuseAngle() {
        return this.alpha;
    }

    set obtuseAngle(v) {
        this.alpha = v;
    }

    get acuteAngle() {
        return this.beta;
    }

    set acuteAngle(v) {
        this.beta = v;
    }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log(
            "Parallelogram: opposite sides equal, opposite angles equal."
        );
    }

    square() {
        console.log(
            "Area:",
            this.a * this.b * Math.sin(deg2rad(this.alpha))
        );
    }

    info() {
        console.log("Parallelogram info:");
        console.log("Sides:", this.a, this.b, this.a, this.b);
        console.log(
            "Angles:",
            this.alpha,
            this.beta,
            this.alpha,
            this.beta
        );
        console.log("Perimeter:", 2 * (this.a + this.b));
        console.log(
            "Area:",
            this.a * this.b * Math.sin(deg2rad(this.alpha))
        );
    }
}

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

const sq = new Square(5);
const rect = new Rectangle(4, 6);
const rh = new Rhombus(5, 120, 60);
const para = new Parallelogram(6, 8, 110, 70);

sq.info();
rect.info();
rh.info();
para.info();


// ===============================
// PART 3
// ===============================

function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

const t1 = Triangular();
const t2 = Triangular(7, 8, 9);
const t3 = Triangular(5, 5, 6);

console.log("Triangular objects:");
console.log(t1);
console.log(t2);
console.log(t3);

function PiMultiplier(x) {
    return function () {
        return Math.PI * x;
    };
}

const mul2 = PiMultiplier(2);
const mul2over3 = PiMultiplier(2 / 3);
const div2 = PiMultiplier(1 / 2);

console.log("PiMultiplier results:");
console.log("pi * 2 =", mul2());
console.log("pi * 2/3 =", mul2over3());
console.log("pi / 2 =", div2());

function Painter(color) {
    return function (obj) {
        if (!obj || typeof obj !== "object") {
            console.log("No ‘type’ property occurred!");
            return;
        }

        if (!("type" in obj)) {
            console.log("No ‘type’ property occurred!");
            return;
        }

        console.log(`${color}: ${obj.type}`);
    };
}

const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

const obj1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

const obj2 = {
    type: "Truck",
    "avg speed": 90,
    "load capacity": 2400
};

const obj3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};

console.log("Painter tests:");

PaintBlue(obj1);
PaintRed(obj1);
PaintYellow(obj1);

PaintBlue(obj2);
PaintRed(obj2);
PaintYellow(obj2);

PaintBlue(obj3);
PaintRed(obj3);
PaintYellow(obj3);

console.log("truck2.trip():");
truck2.trip();
