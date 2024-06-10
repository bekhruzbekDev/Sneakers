import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={210}
    height={260}
    viewBox="0 0 210 260"
    backgroundColor="#cbc8c8"
    foregroundColor="#ebeaea"
    {...props}
  >
    <rect x="9" y="143" rx="0" ry="0" width="1" height="2" />
    <rect x="77" y="135" rx="0" ry="0" width="0" height="56" />
    <rect x="12" y="130" rx="0" ry="0" width="0" height="17" />
    <rect x="102" y="62" rx="0" ry="0" width="2" height="4" />
    <rect x="100" y="66" rx="0" ry="0" width="2" height="1" />
    <rect x="544" y="369" rx="0" ry="0" width="209" height="199" />
    <rect x="5" y="76" rx="0" ry="0" width="2" height="4" />
    <rect x="105" y="43" rx="0" ry="0" width="0" height="1" />
    <rect x="4" y="94" rx="0" ry="0" width="0" height="8" />
    <rect x="-98" y="291" rx="0" ry="0" width="14" height="7" />
    <rect x="148" y="307" rx="0" ry="0" width="1" height="0" />
    <rect x="-226" y="285" rx="0" ry="0" width="152" height="48" />
    <rect x="231" y="334" rx="0" ry="0" width="2" height="10" />
    <rect x="202" y="327" rx="0" ry="0" width="0" height="6" />
    <rect x="18" y="87" rx="0" ry="0" width="0" height="2" />
    <rect x="289" y="48" rx="0" ry="0" width="0" height="1" />
    <rect x="2" y="104" rx="3" ry="3" width="150" height="15" />
    <rect x="3" y="3" rx="10" ry="10" width="150" height="90" />
    <rect x="5" y="135" rx="3" ry="3" width="93" height="15" />
    <rect x="6" y="170" rx="9" ry="9" width="80" height="24" />
    <rect x="116" y="159" rx="9" ry="9" width="32" height="32" />
    <rect x="245" y="115" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
);

export default MyLoader;
