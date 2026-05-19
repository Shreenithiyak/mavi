import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const Profile = () => {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .limit(1)
                .maybeSingle();

            if (data) {
                setProfile(data);
            }

            if (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    return (

        <div className="flex items-center gap-4 bg-white/5 pr-6 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">

            <div className="relative">
                <img
                    src={profile?.avatar_url || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
            </div>

            <h2 className="font-bold text-slate-100 tracking-wide">
                {profile?.name || "Loading..."}
            </h2>

        </div>
    );
};

export default Profile;