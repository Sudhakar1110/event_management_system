# -*- coding: utf-8 -*-
# event_booking_platform/fixtures/demo_data.py
"""Comprehensive demo data generator for Event Booking Platform (Frappe v15 / ERPNext v15).

Creates interconnected records across all DocTypes for testing, demonstrations, and UAT.
Run via: bench execute event_booking_platform.fixtures.demo_data.load_demo_data
"""

from __future__ import unicode_literals
import frappe
from frappe.utils import today, add_days, flt
from random import randint, choice, uniform, seed

seed(42)

# ──────────────────────────────────────────────────────────────────────────────
# MASTER DATA — Customers, Vendors, Categories (created via fixtures)
# ──────────────────────────────────────────────────────────────────────────────

CITIES = [
    ("Bengaluru", "Karnataka", "560001"),
    ("Mysuru", "Karnataka", "570001"),
    ("Hyderabad", "Telangana", "500001"),
    ("Chennai", "Tamil Nadu", "600001"),
    ("Mumbai", "Maharashtra", "400001"),
    ("Pune", "Maharashtra", "411001"),
    ("Delhi", "Delhi", "110001"),
    ("Jaipur", "Rajasthan", "302001"),
    ("Ahmedabad", "Gujarat", "380001"),
    ("Kolkata", "West Bengal", "700001"),
    ("Lucknow", "Uttar Pradesh", "226001"),
    ("Chandigarh", "Punjab", "160001"),
]

CUSTOMER_DATA = [
    # (full_name, email, phone, city_index, dob_offset_days)
    ("Priya Sharma", "priya.sharma@email.in", "9876543210", 4),        # Mumbai
    ("Rohan Kapoor", "rohan.kapoor@email.in", "9876543211", 6),         # Delhi
    ("Anjali Gupta", "anjali.gupta@email.in", "9876543212", 0),         # Bengaluru
    ("Vikram Mehta", "vikram.mehta@email.in", "9876543213", 2),         # Hyderabad
    ("Neha Patel", "neha.patel@email.in", "9876543214", 3),             # Chennai
    ("Arjun Nair", "arjun.nair@email.in", "9876543215", 4),             # Mumbai
    ("Sneha Reddy", "sneha.reddy@email.in", "9876543216", 2),           # Hyderabad
    ("Amit Verma", "amit.verma@email.in", "9876543217", 5),             # Pune
    ("Divya Singh", "divya.singh@email.in", "9876543218", 6),           # Delhi
    ("Karthik Iyer", "karthik.iyer@email.in", "9876543219", 3),         # Chennai
    ("Pooja Joshi", "pooja.joshi@email.in", "9876543220", 5),           # Pune
    ("Rahul Deshmukh", "rahul.deshmukh@email.in", "9876543221", 4),     # Mumbai
    ("Ishita Banerjee", "ishita.banerjee@email.in", "9876543222", 9),   # Kolkata
    ("Siddharth Rao", "siddharth.rao@email.in", "9876543223", 0),       # Bengaluru
    ("Kavita Agarwal", "kavita.agarwal@email.in", "9876543224", 6),     # Delhi
    ("Manish Tiwari", "manish.tiwari@email.in", "9876543225", 11),      # Chandigarh
    ("Lakshmi Krishnan", "lakshmi.krishnan@email.in", "9876543226", 3), # Chennai
    ("Deepak Yadav", "deepak.yadav@email.in", "9876543227", 10),        # Lucknow
    ("Shreya Shetty", "shreya.shetty@email.in", "9876543228", 4),       # Mumbai
    ("Aditya Chopra", "aditya.chopra@email.in", "9876543229", 6),       # Delhi
]

# (vendor_name, category_name, contact_person, email, phone, city_idx, min_price, max_price, price_unit, advance_pct, years, team_size, desc, gst, pan, verified)
VENDOR_DATA = [
    # Wedding Halls
    ("The Grand Palace Wedding Hall", "Wedding Hall", "Ramesh Patel", "info@grandpalacewedding.in", "9988776601", 4, 350000, 1200000, "Per Event", 30, 15, 35, "A magnificent wedding hall in the heart of Mumbai with a capacity of 1000+ guests. Features indoor and outdoor spaces, premium decor, and state-of-the-art facilities.", "27AABCU1234D1Z1", "AABCU1234D", 1),
    ("Jaipur Garden Wedding Resort", "Wedding Hall", "Suresh Sharma", "bookings@jaipurgardenresort.in", "9988776602", 7, 250000, 900000, "Per Event", 25, 10, 25, "Exquisite garden wedding venue spread across 5 acres of lush greenery in Jaipur. Perfect for royal-themed weddings.", "08AABCU5678E1Z2", "AABCU5678E", 1),

    # Banquet Halls
    ("Sapphire Banquet & Convention", "Banquet Hall", "Vikram Arora", "info@sapphirebanquet.in", "9988776603", 0, 150000, 500000, "Per Event", 30, 8, 20, "Modern banquet hall in Bangalore with AC facilities, ample parking, and professional event support team.", "29AABCU9012F1Z3", "AABCU9012F", 1),
    ("Silver Oak Banquet Hall", "Banquet Hall", "Manohar Reddy", "contact@silveroakbanquet.in", "9988776604", 2, 175000, 450000, "Per Event", 25, 12, 18, "Elegant banquet space in Hyderabad featuring traditional architecture with modern amenities.", "36AABCU3456G1Z4", "AABCU3456G", 1),

    # Photographers
    ("Lens & Light Photography Studio", "Photographer", "Aman Sharma", "aman@lenslight.in", "9988776605", 6, 45000, 200000, "Per Event", 50, 8, 8, "Award-winning wedding photography team. Specializing in candid, cinematic, and traditional photography styles.", "07AABCU7890H1Z5", "AABCU7890H", 1),
    ("Shutter Island Photography", "Photographer", "Vijay Kumar", "vijay@shutterisland.in", "9988776606", 5, 35000, 150000, "Per Event", 50, 6, 6, "Creative photography studio capturing moments with artistic flair. Drone photography available.", "27AABCU1112I1Z6", "AABCU1112I", 0),

    # Videographers
    ("Cinematic Moments Films", "Videographer", "Rajesh Khanna", "rajesh@cinematicmoments.in", "9988776607", 4, 55000, 250000, "Per Event", 50, 7, 6, "Professional cinematography team specializing in wedding films, highlight reels, and aerial shots.", "27AABCU1314J1Z7", "AABCU1314J", 1),
    ("Dream Frame Productions", "Videographer", "Sandeep Pillai", "sandeep@dreamframe.in", "9988776608", 3, 40000, 180000, "Per Event", 40, 5, 5, "Cinematic wedding films with same-day edits and drone coverage. Tell your love story beautifully.", "33AABCU1516K1Z8", "AABCU1516K", 1),

    # Decorators
    ("Bloom & Blossom Decorators", "Decorator", "Meera Devi", "meera@bloomdecor.in", "9988776609", 7, 75000, 500000, "Per Event", 30, 10, 20, "Creative event decoration and floral design. Specializing in wedding mandaps, stage decor, and themed events.", "08AABCU1718L1Z9", "AABCU1718L", 1),
    ("Elegance Event Decor", "Decorator", "Pranav Shah", "pranav@elegancedecor.in", "9988776610", 4, 60000, 400000, "Per Event", 30, 8, 15, "Premium decoration services for weddings, corporate events, and social gatherings. Modern & traditional styles.", "27AABCU1920M2Z1", "AABCU1920M", 1),

    # Caterers
    ("Royal Spice Caterers", "Caterer", "Suresh Kumar", "suresh@royalspice.in", "9988776611", 0, 550, 1500, "Per Plate", 40, 15, 40, "Premium catering service offering North Indian, South Indian, Mughlai, and Continental cuisines. 500+ events served.", "29AABCU2122N2Z2", "AABCU2122N", 1),
    ("Taste of India Catering", "Caterer", "Harish Bhat", "harish@tasteofindia.in", "9988776612", 2, 450, 1200, "Per Plate", 40, 12, 35, "Authentic Indian cuisine catering with a wide variety of vegetarian and non-vegetarian menus. Live counters available.", "36AABCU2324O2Z3", "AABCU2324O", 1),

    # Makeup Artists
    ("Glam Studio by Kavita", "Makeup Artist", "Kavita Singh", "kavita@glamstudio.in", "9988776613", 4, 15000, 75000, "Per Event", 50, 8, 5, "Professional bridal makeup, hairstyling, and beauty services. Specializing in airbrush makeup and HD finishes.", "27AABCU2526P2Z4", "AABCU2526P", 1),
    ("Bridal Beauty Lounge", "Makeup Artist", "Neha Kapoor", "neha@bridalbeauty.in", "9988776614", 6, 12000, 60000, "Per Event", 50, 6, 4, "Expert bridal makeup artists serving Delhi NCR. Trial sessions, engagement & wedding day makeup packages.", "07AABCU2728Q2Z5", "AABCU2728Q", 1),

    # Event Planners
    ("Dream Events & Planners", "Event Planner", "Ankit Agarwal", "ankit@dreamevents.in", "9988776615", 0, 50000, 300000, "Per Event", 25, 10, 12, "Full-service event planning company. From concept to execution, we make your dream event a reality.", "29AABCU2930R2Z6", "AABCU2930R", 1),
    ("Celebration Junction", "Event Planner", "Pooja Mehta", "pooja@celebrationjunction.in", "9988776616", 4, 40000, 250000, "Per Event", 25, 7, 10, "Creative event planning and coordination services. Weddings, corporate events, and social gatherings.", "27AABCU3132S2Z7", "AABCU3132S", 0),

    # DJ & Entertainment
    ("DJ Rocker Entertainment", "DJ Provider", "Rocky D'Souza", "rocky@djrocker.in", "9988776617", 4, 25000, 120000, "Per Event", 50, 10, 5, "High-energy DJ services with professional sound systems, lighting, and MC services for all event types.", "27AABCU3334T2Z8", "AABCU3334T", 1),
    ("SoundFusion Entertainment", "DJ Provider", "Arjun Mehta", "arjun@soundfusion.in", "9988776618", 6, 20000, 100000, "Per Event", 40, 6, 4, "Professional DJ and live music services. Bollywood, EDM, Punjabi beats, and customized playlists.", "07AABCU3536U2Z9", "AABCU3536U", 0),

    # Transportation
    ("Royal Wedding Cabs & Cars", "Transportation Provider", "Gurpreet Singh", "info@royalweddingcars.in", "9988776619", 6, 15000, 80000, "Per Event", 30, 8, 25, "Luxury wedding car rentals. BMW, Mercedes, vintage cars, and decorated Tempo Travellers for guest transport.", "07AABCU3738V3Z1", "AABCU3738V", 1),
    ("City Link Transportation", "Transportation Provider", "Rajesh Iyer", "rajesh@citylink.in", "9988776620", 3, 10000, 60000, "Per Event", 25, 5, 30, "Reliable event transportation services. Buses, Tempo Travellers, and luxury cars available for events.", "33AABCU3940W3Z2", "AABCU3940W", 0),
]

# (vendor_idx, package_name, price, duration, max_guests, inclusions)
PACKAGE_DATA = [
    # Grand Palace Wedding Hall
    (0, "Platinum Wedding Package", 1200000, "12 Hours", 1000, "Full-day venue rental, premium decor, stage setup, lighting, sound system, welcome drinks, changing rooms, parking for 100+ vehicles"),
    (0, "Gold Wedding Package", 850000, "8 Hours", 750, "Venue rental, standard decor, stage setup, basic lighting, parking"),
    (0, "Silver Reception Package", 500000, "6 Hours", 500, "Banquet hall setup, basic decor, sound system, parking"),

    # Jaipur Garden Wedding Resort
    (1, "Royal Jaipur Wedding", 900000, "12 Hours", 800, "Garden venue, royal theme decor, stage, lighting, sound, welcome dinner for 50 guests, parking"),
    (1, "Garden Reception Package", 600000, "8 Hours", 600, "Garden setup, floral decor, sound system, catering area, parking"),
    (1, "Engagement Garden Party", 350000, "4 Hours", 300, "Garden setup, basic decor, sound system, refreshments area"),

    # Sapphire Banquet
    (2, "Corporate Event Package", 300000, "8 Hours", 400, "AC hall, podium, projector, sound system, catering area, parking"),
    (2, "Social Gathering Package", 250000, "6 Hours", 350, "Hall rental, basic decor, sound system, parking"),
    (2, "Anniversary Celebration", 175000, "4 Hours", 200, "Hall rental, basic decor, sound system"),

    # Silver Oak Banquet
    (3, "Hyderabadi Wedding Package", 450000, "10 Hours", 600, "Traditional themed decor, AC hall, stage, sound, lighting, parking"),
    (3, "Reception Deluxe", 350000, "6 Hours", 500, "Elegant decor, stage setup, sound system, welcome area"),
    (3, "Mehendi Function Package", 200000, "4 Hours", 300, "Outdoor setup, colorful decor, DJ setup, seating"),

    # Lens & Light Photography
    (4, "Premium Wedding Album", 200000, "Full Day", None, "2 photographers, 1 videographer, 400+ edited photos, 10x12 album, 5-min highlight video, drone shots"),
    (4, "Classic Wedding Package", 120000, "Full Day", None, "1 photographer, 300+ edited photos, 8x12 album, engagement shoot included"),
    (4, "Candid Photography", 75000, "6 Hours", None, "1 photographer, 200+ candid photos, online gallery, 50 prints"),

    # Shutter Island Photography
    (5, "Ultimate Wedding Package", 150000, "Full Day", None, "2 photographers, 500+ photos, premium album, engagement shoot, same-day edit"),
    (5, "Event Photography", 60000, "6 Hours", None, "1 photographer, 200+ photos, online gallery, 30 prints"),
    (5, "Portrait Session", 35000, "2 Hours", None, "Professional portraits, 50+ edited photos, 20 prints, makeup consultation"),

    # Cinematic Moments Films
    (6, "Cinematic Wedding Film", 250000, "Full Day", None, "Full-day coverage, 15-min cinematic film, 5-min highlight reel, drone footage, raw footage copy"),
    (6, "Wedding Highlights", 150000, "Full Day", None, "Full-day coverage, 8-min highlight film, drone footage"),
    (6, "Event Videography", 80000, "6 Hours", None, "Coverage, 3-min highlight, raw footage"),

    # Dream Frame Productions
    (7, "Premium Wedding Cinema", 180000, "Full Day", None, "2 videographers, 20-min cinematic film, 3-min social reel, drone shots, raw footage"),
    (7, "Reel & Remember", 100000, "8 Hours", None, "1 videographer, 10-min film, 2-min highlight reel"),
    (7, "Birthday/Event Coverage", 50000, "4 Hours", None, "1 videographer, 3-min highlight, raw footage"),

    # Bloom & Blossom Decorators
    (8, "Royal Mandap Decoration", 500000, "2 Days", None, "Custom mandap, floral arrangements, entrance decor, stage design, aisle decor, photo booth setup"),
    (8, "Elegant Wedding Decor", 300000, "2 Days", None, "Stage decor, mandap setup, entrance decor, aisle decoration, basic lighting"),
    (8, "Minimalist Decor", 150000, "1 Day", None, "Stage setup, basic floral decor, entrance decoration"),

    # Elegance Event Decor
    (9, "Luxury Event Decor", 400000, "2 Days", None, "Theme-based decor, floral arrangements, lighting, drapery, entrance, stage, ceiling decor"),
    (9, "Corporate Event Styling", 250000, "1 Day", None, "Branded stage setup, backdrop, podiums, lighting, floral arrangements"),
    (9, "Birthday/Tearoom Decor", 100000, "1 Day", None, "Balloon arches, themed decor, photo booth, table settings"),

    # Royal Spice Caterers
    (10, "Royal Wedding Feast", 1200, "Full Day", None, "25-veg & 15-nonveg dishes, 3 live counters, welcome drinks, dessert bar, 50 servers"),
    (10, "Premium Catering", 900, "Full Day", None, "15-veg & 8-nonveg dishes, 2 live counters, dessert station, 25 servers"),
    (10, "Corporate Lunch Package", 550, "Single Meal", None, "5-veg & 3-nonveg options, salad bar, dessert, beverages, serving staff"),

    # Taste of India Catering
    (11, "Grand Feast Supreme", 1200, "Full Day", None, "30 dishes, 4 live counters (chaat, pasta, Italian, dessert), mocktail bar, 40 servers"),
    (11, "Classic Wedding Catering", 800, "Full Day", None, "18 dishes, 2 live counters, dessert counter, 20 servers"),
    (11, "Budget-Friendly Package", 450, "Single Meal", None, "8 dishes, dessert, beverages, basic serving staff"),

    # Glam Studio by Kavita
    (12, "Bridal Glam Package", 75000, "Full Day", None, "Bridal makeup, hairstyling, draping, trial session, 2 touch-ups, mom & sister makeup"),
    (12, "Engagement Look", 35000, "Half Day", None, "Makeup, hairstyling, trial session, 1 touch-up"),
    (12, "Party Makeup", 15000, "3 Hours", None, "Makeup & hairstyling"),

    # Bridal Beauty Lounge
    (13, "Bridal Luxury Package", 60000, "Full Day", None, "Airbrush makeup, hairstyling, trial, touch-ups, mother & sister included"),
    (13, "Doli Ready Package", 40000, "Half Day", None, "Bridal makeup, hairstyling, trial, 1 touch-up"),
    (13, "Guest Makeover", 12000, "2 Hours", None, "Makeup & basic hairstyling"),

    # Dream Events & Planners
    (14, "Complete Wedding Planning", 300000, "3 Months", None, "Full event planning, vendor coordination, budget management, timeline creation, on-day coordination, 3 assistants"),
    (14, "Partial Planning Package", 150000, "2 Months", None, "Vendor coordination, timeline management, on-day coordination"),
    (14, "Day-of Coordination", 50000, "1 Day", None, "On-day coordination, vendor management, timeline execution"),

    # Celebration Junction
    (15, "End-to-End Wedding Planning", 250000, "3 Months", None, "Venue selection, vendor booking, decoration planning, budget management, on-day coordination"),
    (15, "Vendor Management Package", 120000, "2 Months", None, "Vendor sourcing, contract negotiation, coordination, on-day management"),
    (15, "Event Consultation", 40000, "1 Month", None, "Event consultation, vendor recommendations, budget planning"),

    # DJ Rocker Entertainment
    (16, "Premium DJ + Sound + Lights", 120000, "8 Hours", None, "Professional DJ, premium sound system, DJ lights, fog machine, MC services, customized playlist"),
    (16, "Standard DJ Package", 65000, "6 Hours", None, "DJ, sound system, basic lighting, MC services"),
    (16, "Sound System Rental", 25000, "8 Hours", None, "Professional sound system with operator"),

    # SoundFusion Entertainment
    (17, "Ultimate Party Package", 100000, "8 Hours", None, "DJ, sound system, LED wall, dance floor lighting, MC, customized Bollywood/Punjabi playlist"),
    (17, "Wedding DJ Package", 60000, "6 Hours", None, "DJ, sound system, lighting, MC"),
    (17, "Background Music Setup", 20000, "4 Hours", None, "Sound system setup, background music playlist"),

    # Royal Wedding Cabs
    (18, "Luxury Fleet Package", 80000, "Full Day", None, "2 luxury cars (Benz/BMW), 1 Tempo Traveller, 2 decorated cars for baraat, 3 drivers"),
    (18, "Wedding Transport Package", 45000, "Full Day", None, "1 luxury car, 1 Tempo Traveller, decorated car for couple, 2 drivers"),
    (18, "Guest Shuttle Service", 60000, "Full Day", None, "2 Tempo Travellers for guest pick-up/drop, 3 round trips each"),

    # City Link Transportation
    (19, "Complete Event Transport", 60000, "Full Day", None, "2 Tempo Travellers, 1 luxury car, 4 drivers, coordinated scheduling"),
    (19, "Guest Management Package", 35000, "Full Day", None, "2 Tempo Travellers for guest transport, 2 drivers"),
    (19, "Basic Transport Package", 15000, "Half Day", None, "1 Tempo Traveller, 1 driver, point-to-point service"),
]

# Event Type lists
EVENT_TYPES = [
    "Wedding", "Reception", "Engagement", "Mehendi Ceremony",
    "Sangeet Night", "Birthday Party", "Corporate Event",
    "Baby Shower", "Anniversary"
]

EVENT_TITLES = [
    "Anand & Priya's Wedding", "Sharma Family Reception",
    "Rohan & Sneha Engagement", "Mehendi Ceremony - Kapoor Family",
    "Sangeet Night - The Grand Wedding", "Aarav's 1st Birthday Bash",
    "TechCorp Annual Conference", "Baby Shower - Gupta Family",
    "25th Anniversary Celebration", "Rahul & Divya Wedding",
    "Diwali Corporate Gala", "Nair Family Engagement Ceremony",
    "75th Birthday Celebration - Mr. Patel", "Mysuru Wedding Reception",
    "Q3 Team Building Event", "Haldi Ceremony - Mehta Wedding",
    "Wedding Anniversary - Iyer Couple", "New Year's Eve Corporate Party",
    "Baby Shower - Reddy Family", "Sangeet Night - Chopra Wedding",
    "Pre-Wedding Photoshoot Event", "Destination Wedding in Jaipur",
    "Retirement Party - Mr. Deshmukh", "Corporate Awards Night",
    "Wedding Reception - Joshi Family"
]

BOOKING_TITLES = [
    "Wedding Hall Booking - Grand Palace",
    "Photography Booking - Lens & Light",
    "Catering Booking - Royal Spice",
    "Decoration Booking - Bloom & Blossom",
    "DJ Booking - DJ Rocker Entertainment",
    "Makeup Booking - Glam Studio",
    "Catering Booking - Taste of India",
    "Videography Booking - Cinematic Moments",
    "Transport Booking - Royal Wedding Cabs",
    "Venue Booking - Sapphire Banquet",
    "Photography Booking - Shutter Island",
    "Decoration Booking - Elegance Decor",
    "Music Booking - SoundFusion",
    "Makeup Booking - Bridal Beauty Lounge",
    "Transport Booking - City Link",
    "Venue Booking - Jaipur Garden Resort",
    "Videography Booking - Dream Frame Productions",
    "Banquet Booking - Silver Oak",
    "Event Planning - Dream Events",
    "Event Planning - Celebration Junction",
]

STATUS_WEIGHTS = {
    "Draft": 0.08,
    "Requested": 0.12,
    "Confirmed": 0.25,
    "In Progress": 0.15,
    "Completed": 0.30,
    "Cancelled": 0.10,
}


CANCELLATION_REASONS = [
    "Customer Request", "Vendor Unavailable", "Payment Issue",
    "Date Conflict", "Change of Plans", "Other"
]

REFUND_REASONS = [
    "Booking Cancellation", "Service Not Rendered", "Quality Issue",
    "Duplicate Payment", "Other"
]

# ──────────────────────────────────────────────────────────────────────────────
# HELPER FUNCTIONS
# ──────────────────────────────────────────────────────────────────────────────

def weighted_choice(weights_dict):
    """Choose a key from a dict based on weighted probability."""
    items = list(weights_dict.items())
    values = [v for _, v in items]
    keys = [k for k, _ in items]
    total = sum(values)
    r = uniform(0, total)
    cumulative = 0
    for i, v in enumerate(values):
        cumulative += v
        if r <= cumulative:
            return keys[i]
    return keys[-1]


def random_phone():
    """Generate a realistic Indian mobile number."""
    prefixes = ["98", "99", "97",  "88", "89", "95", "96",  "81", "82", "73"]
    return choice(prefixes) + str(randint(10000000, 99999999))


def random_date(start_days=-180, end_days=90):
    """Generate a random date within the given range from today."""
    offset = randint(start_days, end_days)
    return add_days(today(), offset)


def random_past_date(max_days_ago=180):
    return random_date(-max_days_ago, -1)


def random_future_date(max_days_ahead=90):
    return random_date(1, max_days_ahead)


def get_or_create_record(doctype, filters, data, ignore_permissions=True):
    """Get existing record or create new one. Returns document name."""
    existing = frappe.db.exists(doctype, filters)
    if existing:
        return existing

    doc = frappe.get_doc({"doctype": doctype, **data})
    doc.insert(ignore_permissions=ignore_permissions)
    return doc.name


def safe_insert(doc_dict, ignore_permissions=True):
    """Insert a document safely, returning the name.

    Sets ignore_workflow flag to bypass workflow validation for demo data.
    """
    doc = frappe.get_doc(doc_dict)
    doc.flags.ignore_workflow = True
    doc.insert(ignore_permissions=ignore_permissions)
    return doc.name


# ──────────────────────────────────────────────────────────────────────────────
# CLEANUP — Remove orphaned records from previous failed runs
# ──────────────────────────────────────────────────────────────────────────────

def _cleanup_orphaned_data():
    """Remove orphaned Event Service Requirement records from previous failed runs.

    Event Service Requirement uses autoname format:{parent}-{service_category}.
    When child records are created inline with the parent doc during insert(),
    the {parent} field resolves to an empty string, producing names like
    '-Banquet Hall' instead of 'EVT-2026-00001-Banquet Hall'. These orphaned
    names collide globally across all Event Requests on re-runs.

    Only this specific table is affected. Other tables either rolled back
    cleanly or are idempotent via frappe.db.exists checks.
    """
    frappe.db.sql(
        """DELETE FROM `tabEvent Service Requirement`
            WHERE name LIKE '-%'"""
    )


# ──────────────────────────────────────────────────────────────────────────────
# MAIN LOAD FUNCTION
# ──────────────────────────────────────────────────────────────────────────────

def load_demo_data():
    """Main entry point: load complete demo dataset."""
    frappe.flags.ignore_permissions = True

    print("\n" + "=" * 60)
    print("  🎯 Loading Event Booking Platform Demo Data")
    print("=" * 60)

    # Clean up orphaned records from previous failed runs
    # Event Service Requirement uses format:{parent}-{service_category} autoname
    # where {parent} is empty during inline child creation, causing PK conflicts
    _cleanup_orphaned_data()
    print("  ✅ Cleaned up orphaned records from previous runs")

    try:
        _load_config()
        print("  ✅ Configuration settings loaded")

        customers = _load_customers()
        print("  ✅ Created {} Event Customers".format(len(customers)))

        vendors = _load_vendors()
        print("  ✅ Created {} Vendor Profiles".format(len(vendors)))

        packages = _load_packages(vendors)
        print("  ✅ Created {} Vendor Packages".format(len(packages)))

        package_links = _load_package_links(vendors, packages)
        print("  ✅ Created {} Vendor Profile Package Links".format(len(package_links)))

        saved_vendors = _load_saved_vendors(customers, vendors)
        print("  ✅ Created {} Saved Vendors".format(len(saved_vendors)))

        customer_prefs = _load_customer_preferences(customers)
        print("  ✅ Created {} Customer Preferences".format(len(customer_prefs)))

        event_requests = _load_event_requests(customers)
        print("  ✅ Created {} Event Requests".format(len(event_requests)))

        event_plans = _load_event_plans(customers, event_requests)
        print("  ✅ Created {} Event Plans".format(len(event_plans)))

        vendor_bookings = _load_vendor_bookings(customers, vendors, event_requests)
        print("  ✅ Created {} Vendor Bookings".format(len(vendor_bookings)))

        hall_bookings = _load_hall_bookings(customers, vendors)
        print("  ✅ Created {} Hall Bookings".format(len(hall_bookings)))

        package_bookings = _load_package_bookings(customers, vendors, packages)
        print("  ✅ Created {} Package Bookings".format(len(package_bookings)))

        payments = _load_payments(customers, vendors, vendor_bookings)
        print("  ✅ Created {} Booking Payments".format(len(payments)))

        cancellations = _load_cancellations(vendor_bookings)
        print("  ✅ Created {} Booking Cancellations".format(len(cancellations)))

        refunds = _load_refunds(vendor_bookings, cancellations, payments)
        print("  ✅ Created {} Refund Requests".format(len(refunds)))

        reviews = _load_vendor_reviews(customers, vendors, vendor_bookings)
        print("  ✅ Created {} Vendor Reviews".format(len(reviews)))

        vendor_wishlist = _load_vendor_wishlist(customers, vendors)
        print("  ✅ Created {} Vendor Wishlist Entries".format(len(vendor_wishlist)))

        package_comparisons = _load_package_comparisons(customers, packages)
        print("  ✅ Created {} Package Comparisons".format(len(package_comparisons)))

        vendor_recommendations = _load_vendor_recommendations(customers, vendors, packages)
        print("  ✅ Created {} Vendor Recommendations".format(len(vendor_recommendations)))

        # Update vendor ratings based on reviews
        _update_vendor_ratings(vendors)
        print("  ✅ Updated vendor ratings based on reviews")

        frappe.db.commit()
        print("\n" + "=" * 60)
        print("  🎉 Demo data loaded successfully!")
        print("=" * 60 + "\n")

    except Exception as e:
        frappe.db.rollback()
        print("\n  ❌ Error loading demo data: {}".format(str(e)))
        import traceback
        traceback.print_exc()
        raise


# ──────────────────────────────────────────────────────────────────────────────
# 1. CONFIGURATION
# ──────────────────────────────────────────────────────────────────────────────

def _load_config():
    """Load configuration singletons."""
    configs = [
        {
            "doctype": "Event Booking Settings",
            "platform_name": "EventSphere",
            "platform_email": "support@eventsphere.in",
            "support_phone": "1800-123-EVENT",
            "currency": "INR",
            "timezone": "Asia/Kolkata",
            "date_format": "dd-mm-yyyy",
            "min_booking_amount": 5000,
            "max_booking_amount": 5000000,
            "min_advance_percent": 10,
            "max_advance_percent": 75,
            "default_gst_percent": 18.0,
            "enable_vendor_reviews": 1,
            "enable_wishlist": 1,
            "enable_comparison": 1,
            "enable_portal_access": 1,
            "enable_notifications": 1,
            "auto_approve_vendors": 0,
        },
        {
            "doctype": "Vendor Settings",
            "require_approval": 1,
            "auto_approve_with_documents": 1,
            "max_pending_days": 30,
            "min_rating_for_featured": 4.0,
            "featured_vendor_count": 10,
            "commission_type": "Percentage",
            "commission_percent": 10.0,
            "min_payout_amount": 1000,
            "payout_cycle": "Monthly",
        },
        {
            "doctype": "Payment Settings",
            "upi_id": "eventsphere@upi",
            "payment_gateway": "Razorpay",
            "default_advance_percent": 30,
            "max_advance_percent": 75,
            "refund_days": 7,
            "enable_partial_refund": 1,
        },
        {
            "doctype": "Notification Settings",
            "enable_email_notifications": 1,
            "email_template_style": "Modern",
            "sender_name": "EventSphere",
            "sender_email": "notifications@eventsphere.in",
            "booking_confirmation": 1,
            "booking_request": 1,
            "payment_receipt_notification": 1,
            "event_reminder": 1,
            "cancellation_alert": 1,
            "vendor_approved_notification": 1,
            "reminder_days_before": 3,
            "reminder_frequency": "Daily",
        },
        {
            "doctype": "Review Rating Settings",
            "enable_reviews": 1,
            "require_booking_for_review": 1,
            "moderate_reviews": 0,
            "min_review_length": 10,
            "max_reviews_per_booking": 1,
            "auto_publish_reviews": 1,
            "show_review_in_portal": 1,
            "show_rating_in_search": 1,
            "rating_display_style": "Stars",
        },
    ]

    for cfg in configs:
        doctype = cfg["doctype"]
        # Single doctypes always exist once created; check if they have values
        if not frappe.db.exists(doctype, doctype):
            doc = frappe.get_doc(cfg)
            doc.insert(ignore_permissions=True)


# ──────────────────────────────────────────────────────────────────────────────
# 2. CUSTOMERS
# ──────────────────────────────────────────────────────────────────────────────

def _load_customers():
    """Create 20 Event Customers with realistic data."""
    customers = []
    for idx, (name, email, phone, city_idx) in enumerate(CUSTOMER_DATA):
        city, state, _ = CITIES[city_idx]
        if frappe.db.exists("Event Customer", {"email": email}):
            customers.append(frappe.get_value("Event Customer", {"email": email}, "name"))
            continue

        preferred_types = choice([
            "Wedding, Reception, Engagement",
            "Birthday Party, Anniversary",
            "Corporate Event, Conference",
            "Wedding, Sangeet Night, Mehendi",
            "Baby Shower, Birthday Party",
        ])

        budge_range = choice([250000, 500000, 1000000, 1500000, 2000000, 3000000])
        total_bookings = randint(1, 8)
        total_spent = total_bookings * randint(50000, 500000)
        last_booking = random_past_date(90) if total_bookings > 0 else None

        customer_name = safe_insert({
            "doctype": "Event Customer",
            "full_name": name,
            "email": email,
            "phone": phone,
            "city": city,
            "state": state,
            "date_of_birth": add_days(today(), -randint(7000, 15000)),
            "preferred_event_types": preferred_types,
            "budget_range": budge_range,
            "total_bookings": total_bookings,
            "total_spent": total_spent,
            "last_booking_date": last_booking,
        })
        customers.append(customer_name)

    return customers


# ──────────────────────────────────────────────────────────────────────────────
# 3. CUSTOMER PREFERENCES
# ──────────────────────────────────────────────────────────────────────────────

def _load_customer_preferences(customers):
    """Create preferences for each customer."""
    prefs = []
    for cust in customers:
        num_prefs = randint(3, 6)
        types_used = []
        for _ in range(num_prefs):
            pref_type = choice([
                "Event Type", "Vendor Category", "Cuisine",
                "Theme", "Budget Range", "City", "Other"
            ])
            if pref_type in types_used and len(types_used) < 6:
                continue
            types_used.append(pref_type)

            if pref_type == "Event Type":
                value = choice(EVENT_TYPES)
            elif pref_type == "Vendor Category":
                cats = frappe.get_all("Vendor Category", pluck="category_name")
                value = choice(cats) if cats else "Photographer"
            elif pref_type == "Cuisine":
                value = choice(["North Indian", "South Indian", "Mughlai", "Continental", "Chinese", "Italian"])
            elif pref_type == "Theme":
                value = choice(["Traditional", "Modern", "Rustic", "Royal", "Bohemian", "Minimalist"])
            elif pref_type == "Budget Range":
                value = "₹{}-₹{}".format(randint(50000, 200000), randint(300000, 5000000))
            elif pref_type == "City":
                value = choice([c[0] for c in CITIES])
            else:
                value = "Custom preference"

            pref_name = safe_insert({
                "doctype": "Customer Preference",
                "customer": cust,
                "preference_type": pref_type,
                "value": value,
                "is_active": 1,
            })
            prefs.append(pref_name)

    return prefs


# ──────────────────────────────────────────────────────────────────────────────
# 4. VENDORS
# ──────────────────────────────────────────────────────────────────────────────

def _load_vendors():
    """Create vendors with complete profiles.

    Note: Vendor Profile has a workflow ("Vendor Profile Approval") that requires
    the initial state to be "Pending Approval". After insertion, we use
    frappe.db.set_value to set active/verified vendors to "Active" status
    directly in the database, bypassing the workflow for demo data purposes.
    """
    vendors = []
    for idx, (
        vname, cat_name, contact, email, phone, city_idx,
        min_p, max_p, unit, adv_pct, yrs, team, desc, gst, pan, verified
    ) in enumerate(VENDOR_DATA):
        if frappe.db.exists("Vendor Profile", {"email": email}):
            vendors.append(frappe.get_value("Vendor Profile", {"email": email}, "name"))
            continue

        city, state, pincode = CITIES[city_idx]
        cat_doc = frappe.db.get_value("Vendor Category", {"category_name": cat_name}, "name")
        if not cat_doc:
            cat_doc = cat_name  # fallback

        # Always start at the workflow initial state "Pending Approval"
        vendor_name = safe_insert({
            "doctype": "Vendor Profile",
            "vendor_name": vname,
            "vendor_category": cat_doc,
            "status": "Pending Approval",
            "contact_person": contact,
            "email": email,
            "phone": phone,
            "whatsapp": phone,
            "website": "https://www." + vname.lower().replace(" ", "").replace("&", "and").replace("'", "") + ".in",
            "instagram": "@" + vname.lower().replace(" ", "").replace("&", "").replace("'", "")[:15],
            "facebook": vname.lower().replace(" ", "").replace("&", "and").replace("'", "")[:20],
            "city": city,
            "state": state,
            "pincode": pincode,
            "service_areas": ", ".join([CITIES[(city_idx + i) % len(CITIES)][0] for i in range(3)]),
            "business_description": desc,
            "years_in_business": yrs,
            "team_size": team,
            "min_price": float(min_p),
            "max_price": float(max_p),
            "price_unit": unit,
            "advance_required": float(adv_pct),
            "gst_number": gst,
            "pan_number": pan,
            "is_verified": verified,
            "verification_date": add_days(today(), -randint(30, 365)) if verified else None,
        })

        # Bypass workflow to set verified vendors to Active status
        if verified:
            final_status = "Active"
        else:
            final_status = choice(["Pending Approval", "Pending Approval", "Pending Approval", "Suspended"])
        frappe.db.set_value("Vendor Profile", vendor_name, "status", final_status, update_modified=False)

        vendors.append(vendor_name)

    return vendors


# ──────────────────────────────────────────────────────────────────────────────
# 5. VENDOR PACKAGES
# ──────────────────────────────────────────────────────────────────────────────

def _load_packages(vendors):
    """Create vendor packages with items."""
    packages = []
    for pkg_idx, (v_idx, pname, price, duration, max_guests, inclusions) in enumerate(PACKAGE_DATA):
        if v_idx >= len(vendors):
            continue
        vendor = vendors[v_idx]
        items = _get_package_items(pkg_idx, price)

        pkg_name = safe_insert({
            "doctype": "Vendor Package",
            "vendor": vendor,
            "package_name": pname,
            "is_active": 1,
            "price": float(price),
            "duration": duration,
            "max_guests": max_guests,
            "description": "<p><strong>{}</strong></p><p>Package from <strong>{}</strong>. Starting at <strong>₹{:,}</strong>{}</p>".format(
                pname, vendor, price,
                " for up to {} guests.".format(max_guests) if max_guests else "."
            ),
            "inclusions": "<ul>" + "".join("<li>{}</li>".format(i.strip()) for i in inclusions.split(",")) + "</ul>",
            "items": items,
        })
        packages.append(pkg_name)

    return packages


def _get_package_items(pkg_idx, total_price):
    """Generate realistic package items based on package type."""
    items = []
    num_items = randint(3, 6)
    allocated = 0

    item_templates = [
        ("Service Charge", "Basic service charge", 1, None),
        ("Setup Fee", "Event setup and arrangement", 1, None),
        ("Decoration", "Standard decoration", 1, None),
        ("Equipment", "Equipment rental", 1, None),
        ("Labour Charge", "Staff and labour charges", randint(2, 10), None),
        ("Transport", "Transportation/logistics", 1, None),
        ("Consultation Fee", "Professional consultation", 1, None),
    ]

    for i in range(num_items):
        if i >= len(item_templates):
            break
        name, desc, qty, _ = item_templates[i]
        rate = int(total_price * uniform(0.05, 0.4) / qty) if i < num_items - 1 else int(
            (total_price - allocated) / qty)
        if rate < 100:
            rate = 100
        amount = rate * qty
        allocated += amount
        if allocated > total_price:
            amount = max(100, total_price - (allocated - amount))
            rate = int(amount / qty)
            allocated = total_price
        items.append({
            "item_name": name,
            "description": "{} for {} event".format(name, choice(EVENT_TYPES)),
            "quantity": qty,
            "rate": float(rate),
            "amount": float(amount),
        })

    # Adjust last item to match total
    if items and allocated != total_price:
        diff = total_price - allocated
        items[-1]["amount"] = float(items[-1]["amount"] + diff)
        items[-1]["rate"] = float(int(items[-1]["amount"] / items[-1]["quantity"]))

    return items


# ------------------------------------------------------------------------------
# 5b. VENDOR PROFILE PACKAGE LINKS
# ------------------------------------------------------------------------------

def _load_package_links(vendors, packages):
    """Create Vendor Profile Package Link records to bridge the relationship."""
    links = []
    pairs_used = set()
    for vendor in vendors:
        vendor_pkgs = [p for p in packages if frappe.db.get_value("Vendor Package", p, "vendor") == vendor]
        for pkg in vendor_pkgs:
            pair = (vendor, pkg)
            if pair in pairs_used:
                continue
            pairs_used.add(pair)
            vp_doc = frappe.get_doc("Vendor Profile", vendor)
            vp_doc.append("packages", {"vendor_package": pkg})
            vp_doc.flags.ignore_workflow = True
            vp_doc.save()
            links.append(pkg)
    return links

# ──────────────────────────────────────────────────────────────────────────────
# 6. SAVED VENDORS
# ──────────────────────────────────────────────────────────────────────────────

def _load_saved_vendors(customers, vendors):
    """Create saved vendor entries."""
    saved = []
    pairs_used = set()
    for cust in customers:
        num_saved = randint(1, 5)
        for _ in range(num_saved):
            vendor = choice(vendors)
            pair = (cust, vendor)
            if pair in pairs_used:
                continue
            pairs_used.add(pair)
            s = safe_insert({
                "doctype": "Saved Vendor",
                "customer": cust,
                "vendor": vendor,
                "is_favorite": choice([1, 1, 1, 0]),
                "notes": choice(["Great vendor!", "Will book again", "Highly recommended", "", "Good pricing"]),
            })
            saved.append(s)
    return saved


# ──────────────────────────────────────────────────────────────────────────────
# 7. EVENT REQUESTS
# ──────────────────────────────────────────────────────────────────────────────

def _load_event_requests(customers):
    """Create event requests with services required.

    Note: Event Service Requirement uses autoname format:{parent}-{service_category}.
    The {parent} field resolves to empty when child table records are passed inline
    during insert(). To work around this, we insert the Event Request first without
    child records, then append() them afterward so the parent field is correctly set.
    """
    requests = []
    event_type_docs = frappe.get_all("Event Type", pluck="name")

    for i in range(25):
        customer = choice(customers)
        evt_type_name = choice(event_type_docs) if event_type_docs else "Wedding"
        city, state, _ = choice(CITIES)
        event_date = random_future_date(120) if i < 18 else random_past_date(60)
        guest_count = randint(50, 1500)
        budget = guest_count * randint(800, 5000)

        status = weighted_choice({
            "Draft": 0.10,
            "Open": 0.15,
            "In Planning": 0.20,
            "Vendors Confirmed": 0.25,
            "Completed": 0.20,
            "Cancelled": 0.10,
        })

        event_title = choice(EVENT_TITLES) + " #{}".format(i + 1)

        # Insert Event Request WITHOUT services_required (child table)
        # to avoid autoname {parent} resolving to empty
        req_name = safe_insert({
            "doctype": "Event Request",
            "event_title": event_title,
            "customer": customer,
            "event_type": evt_type_name,
            "status": status,
            "event_date": event_date,
            "event_end_date": add_days(event_date, randint(0, 2)),
            "city": city,
            "state": state,
            "venue_type": choice(["Indoor", "Outdoor", "Banquet Hall", "Garden", "Resort", "Farmhouse"]),
            "guest_count": guest_count,
            "total_budget": float(budget),
            "special_notes": "<p>{}</p>".format(choice([
                "Looking for a traditional setup with modern touches.",
                "Need eco-friendly and sustainable decoration options.",
                "Theme: Royal Rajasthani style preferred.",
                "Please include live music and entertainment arrangements.",
                "Need everything arranged with minimal family involvement.",
                "Focus on high-quality food and beverage service.",
                "Want a beach-themed setup with pastel colors.",
            ])),
        })

        # Now append child records one by one so the parent field is properly set
        vendor_cats = frappe.get_all("Vendor Category", pluck="name")
        num_services = randint(3, 7)
        req_doc = frappe.get_doc("Event Request", req_name)
        for s in range(num_services):
            if s < len(vendor_cats):
                vcat = vendor_cats[s]
            else:
                vcat = choice(vendor_cats)
            req_doc.append("services_required", {
                "service_category": vcat,
                "vendor_category": vcat,
                "budget": float(budget * uniform(0.05, 0.3)),
                "is_required": 1 if s < 4 else 0,
                "notes": choice(["Need premium service", "Budget friendly", "Looking for best", "Must be available", ""]),
            })
        req_doc.flags.ignore_workflow = True
        req_doc.save()

        requests.append(req_name)

    return requests


# ──────────────────────────────────────────────────────────────────────────────
# 8. EVENT PLANS
# ──────────────────────────────────────────────────────────────────────────────

def _load_event_plans(customers, event_requests):
    """Create event plans with budgets, guests, schedules, and checklists."""
    plans = []
    event_type_docs = frappe.get_all("Event Type", pluck="name")

    for i in range(15):
        customer = choice(customers)
        evt_type = choice(event_type_docs) if event_type_docs else "Wedding"
        event_req = choice(event_requests) if event_requests else None
        event_date = random_future_date(90)
        guest_count = randint(50, 800)
        total_budget = float(guest_count * randint(1000, 4000))

        # Budget items
        budget_items = []
        budget_categories = [
            "Venue", "Decoration", "Catering", "Photography", "Videography",
            "Music & Entertainment", "Makeup & Styling", "Transportation",
            "Attire & Accessories", "Invitations", "Gifts & Favors", "Miscellaneous"
        ]
        remaining = total_budget
        for bc in budget_categories[:randint(6, 10)]:
            est = remaining * uniform(0.05, 0.25) if remaining > 0 else 0
            if est < 1000:
                continue
            actual = est * uniform(0.85, 1.15)
            budget_items.append({
                "category": bc,
                "description": "{} arrangement for the event".format(bc),
                "estimated_amount": flt(est),
                "actual_amount": flt(actual),
            })
            remaining -= est

        # Guests
        guests = []
        relations = ["Family", "Friend", "Colleague", "Other"]
        rsvps = ["Pending", "Accepted", "Accepted", "Accepted", "Declined", "Maybe"]
        for g in range(min(guest_count, randint(8, 25))):
            first_names = ["Amit", "Sunita", "Raj", "Kavita", "Vijay", "Lata", "Sanjay", "Geeta",
                           "Deepak", "Anita", "Prakash", "Shanti", "Manoj", "Rekha", "Harish", "Nalini",
                           "Ravi", "Poonam", "Ajay", "Smita", "Gaurav", "Neelam", "Tarun", "Radhika"]
            last_names = ["Sharma", "Verma", "Gupta", "Singh", "Reddy", "Patel", "Nair", "Joshi",
                          "Kapoor", "Mehta", "Yadav", "Das", "Sen", "Bose", "Agarwal"]
            fn = choice(first_names)
            ln = choice(last_names)
            guests.append({
                "guest_name": "{} {}".format(fn, ln),
                "email": "{}.{}@email.in".format(fn.lower(), ln.lower()),
                "phone": random_phone(),
                "relation": choice(relations),
                "rsvp_status": choice(rsvps),
            })

        # Schedule
        schedules = []
        activities = [
            ("Welcome Ceremony", "09:00", "09:30"),
            ("Guest Arrival", "09:30", "10:30"),
            ("Main Ceremony", "10:30", "12:30"),
            ("Lunch Break", "12:30", "14:00"),
            ("Post-Lunch Activities", "14:00", "15:30"),
            ("Evening Tea & Snacks", "15:30", "16:30"),
            ("Cultural Program", "16:30", "18:30"),
            ("Dinner Service", "19:00", "21:00"),
            ("Closing Ceremony", "21:00", "22:00"),
        ]
        for idx, (act, st, et) in enumerate(activities):
            if idx < randint(3, 7):
                schedules.append({
                    "activity_name": act,
                    "start_time": st,
                    "end_time": et,
                    "description": "{} scheduled for the event".format(act),
                    "assigned_to": choice(["Event Team", "Vendor Coordinator", "Customer", "Venue Staff"]),
                })

        # Checklist
        checklist = []
        tasks = [
            ("Venue Booking Confirmation", "Completed"),
            ("Vendor Contracts Signed", "Completed"),
            ("Catering Menu Finalized", "Completed"),
            ("Decoration Theme Finalized", "In Progress"),
            ("Photography Schedule Confirmed", "Completed"),
            ("Music Playlist Shared", "Pending"),
            ("Guest List Finalized", "Completed"),
            ("Invitations Sent", "Completed"),
            ("Seating Arrangement Planned", "In Progress"),
            ("Transport Arrangement Confirmed", "Pending"),
            ("Power Backup Checked", "Completed"),
            ("Sound System Test Scheduled", "Pending"),
            ("Makeup Trial Completed", "Completed"),
            ("Emergency Contacts Collected", "In Progress"),
            ("Post-Event Cleanup Planned", "Pending"),
        ]
        for tk, st in tasks[:randint(8, 14)]:
            checklist.append({
                "task": tk,
                "status": st,
                "due_date": add_days(event_date, -randint(1, 30)),
                "assigned_to": choice(["Event Manager", "Customer", "Vendor Coordinator", "Planner"]),
            })

        plan_name = safe_insert({
            "doctype": "Event Plan",
            "plan_name": "{} Plan - {}".format(evt_type, "#{}".format(i + 1)),
            "customer": customer,
            "event_type": evt_type,
            "status": choice(["Draft", "In Progress", "Completed"]),
            "event_date": event_date,
            "total_budget": total_budget,
            "budget_items": budget_items,
            "guests": guests,
            "schedules": schedules,
            "checklist_items": checklist,
        })
        plans.append(plan_name)

    return plans


# ──────────────────────────────────────────────────────────────────────────────
# 9. VENDOR BOOKINGS (Primary Booking DocType)
# ──────────────────────────────────────────────────────────────────────────────

def _load_vendor_bookings(customers, vendors, event_requests):
    """Create 60+ vendor bookings with varied statuses."""
    bookings = []

    for i in range(65):
        customer = choice(customers)
        vendor = choice(vendors)
        event_req = choice(event_requests) if event_requests else None
        event_date = random_date(-120, 60)
        booking_date = add_days(event_date, -randint(7, 90)) if event_date <= today() else random_past_date(30)

        # Get vendor info for pricing
        vendor_doc = frappe.get_doc("Vendor Profile", vendor)
        base_amount = float(vendor_doc.min_price or 0) * uniform(0.8, 2.5)
        if base_amount < 5000:
            base_amount = uniform(5000, 50000)

        discount_pct = choice([0, 0, 0, 5, 10, 10, 15])
        discount_amt = base_amount * discount_pct / 100
        taxable = base_amount - discount_amt
        gst_pct = 18.0
        gst_amt = taxable * gst_pct / 100
        total = taxable + gst_amt

        advance_pct = float(vendor_doc.advance_required or 30)
        advance_amt = total * advance_pct / 100

        booking_status = weighted_choice(STATUS_WEIGHTS)
        if booking_status == "Cancelled":
            payment_status = "Refunded"
            paid_amount = advance_amt * 0.5  # partially refunded
        elif booking_status in ("Completed", "In Progress"):
            payment_status = choice(["Fully Paid", "Partially Paid", "Partially Paid"])
            paid_amount = total if payment_status == "Fully Paid" else total * uniform(0.3, 0.7)
        elif booking_status == "Confirmed":
            payment_status = choice(["Partially Paid", "Partially Paid", "Unpaid"])
            paid_amount = advance_amt if payment_status == "Partially Paid" else 0
        else:
            payment_status = "Unpaid"
            paid_amount = 0

        balance = total - paid_amount

        # Fetch event details from event request if linked
        evt_type = None
        evt_venue = None
        guest_ct = None
        if event_req:
            er = frappe.get_doc("Event Request", event_req)
            evt_type = er.event_type
            evt_venue = er.city + ", " + er.state if er.city else None
            guest_ct = er.guest_count

        booking_title = choice(BOOKING_TITLES) + " - {:02d}".format(i + 1)

        booking_name = safe_insert({
            "doctype": "Vendor Booking",
            "booking_title": booking_title,
            "customer": customer,
            "vendor": vendor,
            "booking_status": booking_status,
            "event_request": event_req,
            "booking_date": booking_date,
            "event_type": evt_type,
            "event_date": event_date,
            "event_end_date": add_days(event_date, randint(0, 1)),
            "event_time": "10:00:00",
            "venue": evt_venue or choice([c[0] for c in CITIES]),
            "guest_count": guest_ct or randint(50, 1000),
            "special_requirements": choice([
                "",
                "<p>Need vegetarian options for all meals.</p>",
                "<p>Please arrange wheelchair accessibility.</p>",
                "<p>Need vegan and gluten-free options.</p>",
                "<p>Red-themed decoration preferred.</p>",
                "<p>Please confirm availability before finalizing.</p>",
            ]),
            "base_amount": flt(base_amount),
            "discount_percent": flt(discount_pct),
            "discount_amount": flt(discount_amt),
            "taxable_amount": flt(taxable),
            "gst_percent": flt(gst_pct),
            "gst_amount": flt(gst_amt),
            "total_amount": flt(total),
            "advance_percent": flt(advance_pct),
            "advance_amount": flt(advance_amt),
            "paid_amount": flt(paid_amount),
            "balance_amount": flt(balance),
            "payment_status": payment_status,
            "vendor_notes": choice([
                "",
                "Please confirm the final menu 1 week before.",
                "Setup time required: 4 hours before event.",
                "Need additional staff for this event.",
            ]),
            "terms_conditions": "<p>50% advance required to confirm booking. Balance to be paid 3 days before the event. Cancellation charges apply as per policy.</p>",
            "cancellation_policy": "<p>30 days before event: Full refund. 15-29 days: 50% refund. 7-14 days: 25% refund. Less than 7 days: No refund.</p>",
        })
        bookings.append(booking_name)

    return bookings


# ──────────────────────────────────────────────────────────────────────────────
# 10. HALL BOOKINGS
# ──────────────────────────────────────────────────────────────────────────────

def _load_hall_bookings(customers, vendors):
    """Create hall booking records."""
    bookings = []
    hall_vendors = [v for i, v in enumerate(vendors) if i < 4]  # First 4 vendors are halls

    for i in range(15):
        customer = choice(customers)
        vendor = choice(hall_vendors) if hall_vendors else choice(vendors)
        event_date = random_date(-90, 60)
        booking_date = add_days(event_date, -randint(10, 60))
        base_amount = float(randint(100000, 800000))

        booking_status = weighted_choice({
            "Draft": 0.10,
            "Confirmed": 0.35,
            "In Progress": 0.20,
            "Completed": 0.25,
            "Cancelled": 0.10,
        })

        if booking_status == "Cancelled":
            payment_status = "Unpaid"
            paid_amount = 0
        elif booking_status in ("Completed", "In Progress"):
            payment_status = choice(["Fully Paid", "Partially Paid"])
            paid_amount = base_amount if payment_status == "Fully Paid" else base_amount * 0.5
        else:
            payment_status = choice(["Unpaid", "Partially Paid"])
            paid_amount = base_amount * 0.3 if payment_status == "Partially Paid" else 0

        discount_pct = choice([0, 0, 5, 10])
        total = base_amount * (1 - discount_pct / 100)
        advance = total * 0.3

        booking_name = safe_insert({
            "doctype": "Hall Booking",
            "booking_title": "Hall Booking - {} Event {:02d}".format(vendor, i + 1),
            "customer": customer,
            "vendor": vendor,
            "hall_name": choice(["Grand Ballroom", "Royal Hall", "Garden Pavilion", "Crystal Hall", "Silver Lounge"]),
            "booking_status": booking_status,
            "booking_date": booking_date,
            "event_date": event_date,
            "event_end_date": add_days(event_date, 1),
            "base_amount": flt(base_amount),
            "discount_percent": flt(discount_pct),
            "total_amount": flt(total),
            "advance_amount": flt(advance),
            "paid_amount": flt(paid_amount),
            "balance_amount": flt(max(0, total - paid_amount)),
            "payment_status": payment_status,
            "special_requirements": choice(["", "Need AC at full capacity", "Stage on east side", "VIP seating area required"]),
        })
        bookings.append(booking_name)

    return bookings


# ──────────────────────────────────────────────────────────────────────────────
# 11. PACKAGE BOOKINGS
# ──────────────────────────────────────────────────────────────────────────────

def _load_package_bookings(customers, vendors, packages):
    """Create package booking records."""
    bookings = []

    for i in range(15):
        customer = choice(customers)
        vendor = choice(vendors)
        pkg = choice(packages) if packages else None
        event_date = random_date(-60, 60)
        booking_date = add_days(event_date, -randint(5, 45))

        pkg_price = 0
        if pkg:
            pkg_doc = frappe.get_doc("Vendor Package", pkg)
            pkg_price = float(pkg_doc.price) if pkg_doc.price else float(randint(50000, 500000))
        else:
            pkg_price = float(randint(50000, 500000))

        booking_status = weighted_choice({
            "Draft": 0.10,
            "Confirmed": 0.40,
            "Completed": 0.35,
            "Cancelled": 0.15,
        })

        total = pkg_price
        if booking_status == "Cancelled":
            payment_status = "Unpaid"
            paid_amount = 0
        elif booking_status == "Completed":
            payment_status = "Fully Paid"
            paid_amount = total
        else:
            payment_status = choice(["Unpaid", "Partially Paid"])
            paid_amount = total * 0.3 if payment_status == "Partially Paid" else 0

        booking_name = safe_insert({
            "doctype": "Package Booking",
            "booking_title": "Package Booking - {} - {:02d}".format(vendor, i + 1),
            "customer": customer,
            "vendor": vendor,
            "package": pkg,
            "booking_status": booking_status,
            "event_date": event_date,
            "booking_date": booking_date,
            "package_price": flt(pkg_price),
            "total_amount": flt(total),
            "advance_amount": flt(total * 0.3),
            "paid_amount": flt(paid_amount),
            "balance_amount": flt(max(0, total - paid_amount)),
            "payment_status": payment_status,
        })
        bookings.append(booking_name)

    return bookings


# ──────────────────────────────────────────────────────────────────────────────
# 12. BOOKING PAYMENTS
# ──────────────────────────────────────────────────────────────────────────────

def _load_payments(customers, vendors, vendor_bookings):
    """Create 90+ payment records for bookings."""
    payments = []
    transaction_prefixes = ["TXN", "UTR", "PAY", "RZP"]

    for i in range(90):
        booking = choice(vendor_bookings)
        bkg = frappe.get_doc("Vendor Booking", booking)
        customer = bkg.customer
        vendor = bkg.vendor

        payment_date = random_past_date(60)
        payment_type = weighted_choice({
            "Advance": 0.40,
            "Installment": 0.25,
            "Final Payment": 0.25,
            "Refund": 0.10,
        })
        payment_mode = weighted_choice({
            "UPI": 0.40,
            "Credit Card": 0.15,
            "Debit Card": 0.10,
            "Net Banking": 0.10,
            "Cash": 0.15,
            "Cheque": 0.05,
            "Bank Transfer": 0.05,
        })

        amount = 0
        if payment_type == "Advance":
            amount = bkg.total_amount * uniform(0.2, 0.5)
        elif payment_type == "Installment":
            amount = bkg.total_amount * uniform(0.2, 0.4)
        elif payment_type == "Final Payment":
            amount = bkg.balance_amount if bkg.balance_amount > 0 else bkg.total_amount * 0.5
        elif payment_type == "Refund":
            amount = bkg.advance_amount * uniform(-1, -0.5)  # Negative for refunds

        amount = abs(amount)
        if amount < 100:
            amount = float(randint(500, 10000))

        status = weighted_choice({
            "Completed": 0.80,
            "Pending": 0.08,
            "Failed": 0.07,
            "Refunded": 0.05,
        })

        txn_id = "{}-{:08d}".format(choice(transaction_prefixes), randint(10000000, 99999999))

        payment_name = safe_insert({
            "doctype": "Booking Payment",
            "booking": booking,
            "customer": customer,
            "vendor": vendor,
            "payment_date": payment_date,
            "payment_type": payment_type,
            "payment_mode": payment_mode,
            "status": status,
            "amount": flt(amount),
            "transaction_id": txn_id,
            "upi_id": "customer{}@paytm".format(randint(100, 999)) if payment_mode == "UPI" else None,
            "remarks": choice([
                "Advance payment for booking",
                "Installment #{} payment".format(randint(1, 3)),
                "Final settlement payment",
                "Partial refund processed",
                "Full payment received",
            ]),
        })
        payments.append(payment_name)

    return payments


# ──────────────────────────────────────────────────────────────────────────────
# 13. BOOKING CANCELLATIONS
# ──────────────────────────────────────────────────────────────────────────────

def _load_cancellations(vendor_bookings):
    """Create cancellation records for cancelled bookings."""
    cancellations = []

    for booking in vendor_bookings:
        bkg = frappe.get_doc("Vendor Booking", booking)
        if bkg.booking_status != "Cancelled":
            continue

        reason = choice(CANCELLATION_REASONS)
        refund_pct = uniform(0.2, 0.8)

        cncl = safe_insert({
            "doctype": "Booking Cancellation",
            "booking": booking,
            "customer": bkg.customer,
            "vendor": bkg.vendor,
            "cancellation_date": random_past_date(30),
            "cancellation_reason": reason,
            "refund_amount": flt(bkg.paid_amount * refund_pct) if bkg.paid_amount else 0,
            "status": choice(["Approved", "Processed", "Pending"]),
        })
        cancellations.append(cncl)

    return cancellations


# ──────────────────────────────────────────────────────────────────────────────
# 14. REFUND REQUESTS
# ──────────────────────────────────────────────────────────────────────────────

def _load_refunds(vendor_bookings, cancellations, payments):
    """Create refund requests for cancelled bookings."""
    refunds = []

    for booking in vendor_bookings:
        bkg = frappe.get_doc("Vendor Booking", booking)
        if bkg.payment_status != "Refunded":
            continue

        cancellation = None
        for c in cancellations:
            c_doc = frappe.get_doc("Booking Cancellation", c)
            if c_doc.booking == booking:
                cancellation = c
                break

        payment = None
        for p in payments:
            p_doc = frappe.get_doc("Booking Payment", p)
            if p_doc.booking == booking:
                payment = p
                if p_doc.payment_type == "Refund":
                    continue
                break

        refund = safe_insert({
            "doctype": "Refund Request",
            "booking": booking,
            "customer": bkg.customer,
            "vendor": bkg.vendor,
            "refund_date": random_past_date(15),
            "refund_reason": choice(REFUND_REASONS),
            "amount": flt(bkg.paid_amount * uniform(0.3, 0.7)),
            "status": choice(["Approved", "Processed", "Pending"]),
            "cancellation_reference": cancellation,
            "payment_reference": payment,
            "approved_by": "Administrator",
            "approval_date": random_past_date(10),
            "notes": "Refund processed as per cancellation policy.",
        })
        refunds.append(refund)

    return refunds


# ──────────────────────────────────────────────────────────────────────────────
# 15. VENDOR REVIEWS
# ──────────────────────────────────────────────────────────────────────────────

def _load_vendor_reviews(customers, vendors, vendor_bookings):
    """Create reviews for completed bookings."""
    reviews = []
    review_titles = [
        "Excellent service! Highly recommended",
        "Wonderful experience",
        "Good but could improve",
        "Absolutely amazing!",
        "Professional and punctual",
        "Great value for money",
        "Could have been better",
        "Outstanding quality",
        "Satisfied with the service",
        "Made our event special",
        "Very professional team",
        "Beautiful work",
        "Will definitely book again",
        "Exceptional quality",
        "Above and beyond expectations",
    ]

    review_texts = [
        "We were thoroughly impressed with the quality of service. Everything was arranged perfectly and the team was very professional throughout the event.",
        "The vendor did an excellent job. From the initial consultation to the final execution, everything was handled with great care and attention to detail.",
        "Good service overall. There were minor issues with timing but the quality of work was satisfactory. Would recommend with some improvements.",
        "Absolutely loved their work! They transformed our venue into something magical. Our guests were very impressed.",
        "Very professional team. They arrived on time, set up beautifully, and delivered exactly what was promised. Highly recommended!",
        "Decent service for the price. Communication could be better but the end result was good.",
        "Exceptional! They went above and beyond our expectations. Every detail was taken care of beautifully.",
        "The team was wonderful to work with. Very responsive, flexible with our requirements, and delivered outstanding results.",
        "Satisfied with the overall experience. There's room for improvement in coordination, but the quality was good.",
        "They made our wedding day perfect. Everything was arranged exactly as we wanted. Thank you for the wonderful experience!",
    ]

    reviewed_combos = set()

    for booking in vendor_bookings:
        bkg = frappe.get_doc("Vendor Booking", booking)
        if bkg.booking_status not in ("Completed", "In Progress", "Confirmed"):
            continue
        if randint(0, 3) > 1:  # ~50% of eligible bookings get reviews
            continue

        pair = (bkg.customer, bkg.vendor)
        if pair in reviewed_combos:
            continue
        reviewed_combos.add(pair)

        rating = randint(1, 5)
        if rating == 1:
            # 1-star reviews should only be rare
            rating = 2 if randint(0, 2) > 0 else 1

        review_title = choice(review_titles)
        if rating >= 4:
            review_title = choice(["Excellent service! Highly recommended", "Absolutely amazing!", "Outstanding quality", "Exceptional! Very professional"])
        elif rating <= 2:
            review_title = choice(["Disappointing experience", "Could be better", "Not up to expectations"])

        review_text = choice(review_texts) if rating >= 3 else "We were not entirely satisfied with the service. There were several issues that need to be addressed. Hope improvements are made."

        # Get customer name
        customer_doc = frappe.get_doc("Event Customer", bkg.customer)
        reviewer_name = customer_doc.full_name

        review_name = safe_insert({
            "doctype": "Vendor Review",
            "vendor": bkg.vendor,
            "customer": bkg.customer,
            "booking": booking,
            "reviewer_name": reviewer_name,
            "rating": rating,
            "event_type": bkg.event_type,
            "event_date": bkg.event_date,
            "review_title": review_title,
            "review_text": "<p>{}</p>".format(review_text),
            "helpful_count": randint(0, 25),
        })
        reviews.append(review_name)

    return reviews


# ──────────────────────────────────────────────────────────────────────────────
# 16. VENDOR WISHLIST
# ──────────────────────────────────────────────────────────────────────────────

def _load_vendor_wishlist(customers, vendors):
    """Create wishlist entries for customers."""
    wishlist = []
    pairs_used = set()

    for cust in customers:
        for _ in range(randint(0, 4)):
            vendor = choice(vendors)
            pair = (cust, vendor)
            if pair in pairs_used:
                continue
            pairs_used.add(pair)

            w = safe_insert({
                "doctype": "Vendor Wishlist",
                "customer": cust,
                "vendor": vendor,
                "notes": choice([
                    "Want to book for my wedding",
                    "Looks promising, will contact soon",
                    "High on my list",
                    "Need to check availability",
                    "",
                ]),
            })
            wishlist.append(w)

    return wishlist


# ──────────────────────────────────────────────────────────────────────────────
# 17. PACKAGE COMPARISON
# ──────────────────────────────────────────────────────────────────────────────

def _load_package_comparisons(customers, packages):
    """Create package comparison records for customers."""
    comparisons = []
    for cust in customers:
        if randint(0, 2) == 0:  # 1/3 of customers have comparisons
            selected = []
            for _ in range(randint(2, 4)):
                pkg = choice(packages) if packages else None
                if pkg and pkg not in selected:
                    selected.append(pkg)
            if selected:
                pkg_names = ", ".join([frappe.get_doc("Vendor Package", p).package_name for p in selected[:3]])
                c = safe_insert({
                    "doctype": "Package Comparison",
                    "customer": cust,
                    "packages": pkg_names,
                    "notes": choice([
                        "Comparing pricing and inclusions before final decision.",
                        "Need to evaluate which package offers better value.",
                        "Looking for the best combination of services and price.",
                    ]),
                })
                comparisons.append(c)
    return comparisons


# ──────────────────────────────────────────────────────────────────────────────
# 18. VENDOR RECOMMENDATIONS
# ──────────────────────────────────────────────────────────────────────────────

def _load_vendor_recommendations(customers, vendors, packages):
    """Create vendor recommendation records for customers."""
    recommendations = []
    recommendation_reasons = [
        "Top-rated vendor in your city",
        "Matches your budget requirements",
        "Highly recommended for {} events",
        "Best selling package in this category",
        "Consistently high customer ratings",
        "Great value for your budget range",
    ]

    for cust in customers:
        for _ in range(randint(0, 4)):
            vendor = choice(vendors)
            score = round(uniform(3.0, 5.0), 2)
            reason = choice(recommendation_reasons).format(choice(EVENT_TYPES))

            # Check if already exists
            if frappe.db.exists("Vendor Recommendation", {"customer": cust, "vendor": vendor}):
                continue

            r = safe_insert({
                "doctype": "Vendor Recommendation",
                "customer": cust,
                "vendor": vendor,
                "recommendation_reason": reason,
                "score": score,
            })
            recommendations.append(r)

    return recommendations


# ──────────────────────────────────────────────────────────────────────────────
# 19. UPDATE VENDOR RATINGS
# ──────────────────────────────────────────────────────────────────────────────

def _update_vendor_ratings(vendors):
    """Recalculate average rating and total reviews for each vendor."""
    for vendor in vendors:
        reviews = frappe.get_all(
            "Vendor Review",
            filters={"vendor": vendor, "docstatus": 1},
            fields=["rating"]
        )
        if reviews:
            total_reviews = len(reviews)
            avg_rating = sum(r["rating"] for r in reviews) / total_reviews
            frappe.db.set_value("Vendor Profile", vendor, {
                "rating": flt(avg_rating, 1),
                "total_reviews": total_reviews,
            }, update_modified=False)


# ──────────────────────────────────────────────────────────────────────────────
# ENTRY POINT
# ──────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    load_demo_data()
