import React, { Suspense, lazy } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

const Admin = lazy(() => import("admin/AdminApp"));
const Analytics = lazy(() => import("analytics/AnalyticsApp"));
const Availability = lazy(() => import("availability/AvailabilityApp"));
const Collaboration = lazy(() => import("collaboration/CollaborationApp"));
const EventCreation = lazy(() => import("event_creation/EventCreationApp"));
const EventDetails = lazy(() => import("event_details/EventDetailsApp"));
const EventList = lazy(() => import("event_list/EventListApp"));
const Integrations = lazy(() => import("integrations/IntegrationsApp"));
const Invitations = lazy(() => import("invitations/InvitationsApp"));
const Search = lazy(() => import("search/SearchApp"));
const Settings = lazy(() => import("settings/SettingsApp"));
const Views = lazy(() => import("views/ViewsApp"));
const Notifications = lazy(() => import("notifications/NotificationsApp"));
const RecurrenceRules = lazy(() =>
  import("recurrence_rules/RecurrenceRulesApp")
);

function CalendarLayout() {
  const prefix = window.location.pathname.startsWith("/calendar")
    ? "/calendar"
    : "";
  return (
    <>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to={`${prefix}/admin`} style={{ marginRight: 10 }}>
          Admin
        </Link>
        <Link to={`${prefix}/analytics`} style={{ marginRight: 10 }}>
          Analytics
        </Link>
        <Link to={`${prefix}/availability`} style={{ marginRight: 10 }}>
          Availability
        </Link>
        <Link to={`${prefix}/collaborations`} style={{ marginRight: 10 }}>
          Collaborations
        </Link>
        <Link to={`${prefix}/event-creation`} style={{ marginRight: 10 }}>
          Event Creation
        </Link>
        <Link to={`${prefix}/event-details`} style={{ marginRight: 10 }}>
          Event Details
        </Link>
        <Link to={`${prefix}/event-list`} style={{ marginRight: 10 }}>
          Event List
        </Link>
        <Link to={`${prefix}/integrations`} style={{ marginRight: 10 }}>
          Integrations
        </Link>
        <Link to={`${prefix}/invitations`} style={{ marginRight: 10 }}>
          Invitations
        </Link>
        <Link to={`${prefix}/notifications`} style={{ marginRight: 10 }}>
          Notifications
        </Link>
        <Link to={`${prefix}/recurrence-rules`} style={{ marginRight: 10 }}>
          Recurrence Rules
        </Link>
        <Link to={`${prefix}/search`} style={{ marginRight: 10 }}>
          Search
        </Link>
        <Link to={`${prefix}/settings`} style={{ marginRight: 10 }}>
          Settings
        </Link>
        <Link to={`${prefix}/views`} style={{ marginRight: 10 }}>
          Views
        </Link>
      </nav>
      <Outlet />
    </>
  );
}
export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading Blog…</div>}>
        <Routes>
          <Route path="" element={<CalendarLayout />}>
            <Route index element={<div>Calendar landing page</div>} />
            <Route path="admin" element={<Admin />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="availability" element={<Availability />} />
            <Route path="collaborations" element={<Collaboration />} />
            <Route path="event-creation" element={<EventCreation />} />
            <Route path="event-details" element={<EventDetails />} />
            <Route path="event-list" element={<EventList />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="invitations" element={<Invitations />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="recurrence-rules" element={<RecurrenceRules />} />
            <Route path="search" element={<Search />} />
            <Route path="settings" element={<Settings />} />
            <Route path="views" element={<Views />} />
          </Route>
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </Suspense>
    </>
  );
}
