# Proxy package — provides "event_management_system" namespace for backwards compatibility
# This is imported when sites have "event_management_system" in their installed_apps list.
# The actual hooks.py in this package re-exports all hooks from event_booking_platform.
