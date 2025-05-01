import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

const EventRegistrations = () => {
    const { eventId } = useParams();
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [eventName, setEventName] = useState("");

    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/events/get-event/${eventId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const event = res.data.event;
            if (event && event.name) {
                setEventName(event.name.toLowerCase());
            }
        } catch (err) {
            console.error("Failed to fetch event details:", err);
        }
    };

    const fetchRegistrations = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/guide/event-registrations/${eventId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const fetchedRegistrations = res.data.registrations || [];
            setRegistrations(fetchedRegistrations);
        } catch (error) {
            console.error("Error fetching registrations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventDetails();
        fetchRegistrations();
    }, [eventId]);

    const soloRegistrations = registrations.filter((reg) => reg.type === "solo");
    const groupRegistrations = registrations.filter((reg) => reg.type === "group");

    return (
        <Layout>
            <div className="p-4 md:p-6">
            
                {loading ? (
                    <p className="text-center">Loading registrations...</p>
                ) : registrations.length === 0 ? (
                    <p className="text-center">No registrations yet for this event.</p>
                ) : (
                    <div className="flex flex-col gap-12 mt-5">
                        <h3 className="text-lg font-semibold mt-5 text-center">
                            Registration List
                        </h3>

                        {/* Group Events */}
                        {groupRegistrations.length > 0 && (
                            <div className="flex flex-col items-center gap-6">
                                {groupRegistrations.map((reg, groupIndex) => (
                                    <div
                                        key={groupIndex}
                                        className="border border-gray-300 rounded-md p-4 shadow-md w-[90%] max-w-7xl"
                                    >
                                        <p className="mb-3 text-center">
                                            <strong>Team Name:</strong> {reg.teamName}
                                        </p>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-[700px] w-full border text-center">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="border p-2">Name</th>
                                                        <th className="border p-2">Roll Number</th>
                                                        <th className="border p-2">Mobile</th>
                                                        <th className="border p-2">Email</th>
                                                        <th className="border p-2">Branch</th>
                                                        <th className="border p-2">Division</th>
                                                        <th className="border p-2">Year</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {reg.participants.map((p, i) => (
                                                        <tr key={i}>
                                                            <td className="border p-2">{p.name}</td>
                                                            <td className="border p-2">{p.rollNumber}</td>
                                                            <td className="border p-2">{p.mobileNumber}</td>
                                                            <td className="border p-2">{p.email}</td>
                                                            <td className="border p-2">{p.branch}</td>
                                                            <td className="border p-2">{p.division}</td>
                                                            <td className="border p-2">{p.year}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Solo Events */}
                        {soloRegistrations.length > 0 && (
                            <div className="overflow-x-auto flex justify-center">
                                <table className="min-w-[1000px] w-full max-w-6xl border text-center">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border p-2">Name</th>
                                            <th className="border p-2">Roll Number</th>
                                            <th className="border p-2">Mobile</th>
                                            <th className="border p-2">Email</th>
                                            <th className="border p-2">Branch</th>
                                            <th className="border p-2">Division</th>
                                            <th className="border p-2">Year</th>
                                            {eventName === "cricket" && (
                                                <th className="border p-2">Specialization</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {soloRegistrations.map((reg, index) => (
                                            <tr key={index}>
                                                <td className="border p-2">
                                                    {reg.formData["Participant Name"]}
                                                </td>
                                                <td className="border p-2">
                                                    {reg.formData["rollNumber"]}
                                                </td>
                                                <td className="border p-2">
                                                    {reg.formData["mobileNumber"]}
                                                </td>
                                                <td className="border p-2">{reg.formData["email"]}</td>
                                                <td className="border p-2">
                                                    {reg.formData["Department"]}
                                                </td>
                                                <td className="border p-2">
                                                    {reg.formData["division"]}
                                                </td>
                                                <td className="border p-2">
                                                    {reg.formData["Current Year"]}
                                                </td>
                                                {eventName === "cricket" && (
                                                    <td className="border p-2">
                                                        {reg.formData["specialization"] || "N/A"}
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default EventRegistrations;
