import { DiscussionEmbed } from "disqus-react";
import { DOMAIN, DISQUS_SHORTNAME } from "@/config";

const DisqusComments = ({ url, identifier, title }) => {

    const disqusConfig = {
        url: `${DOMAIN}${url}`,
        identifier: identifier,
        title: title,
    };

    return (
        <div>
            <DiscussionEmbed
                shortname={DISQUS_SHORTNAME}
                config={disqusConfig}
            />
        </div>
    );
};

export default DisqusComments;
