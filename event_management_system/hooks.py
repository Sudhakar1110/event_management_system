# Proxy hooks — makes event_management_system.hooks resolve to event_booking_platform.hooks
#
# This file is used when a Frappe site has "event_management_system" in its
# installed_apps list (e.g., after the app was renamed from event_management_system
# to event_booking_platform). All hook variables from the real app are re-exported
# here so Frappe can find them under the old module name.
from event_booking_platform.hooks import *  # noqa: F401, F403
