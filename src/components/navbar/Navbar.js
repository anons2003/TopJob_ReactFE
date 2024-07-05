import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon
              className="icon"
              onClick={toggleFullscreen}
            />
          </div>
          <div className="item">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBAPEA8QFRUWDhUQFRUWDxEQFhMQFRIXFhUSFhUYHSggGBolGxYVIjEiJSkrLi4uGB83ODM4NygtLisBCgoKDg0OGxAQGy0lHyU3Ny0rKy0vLy0tLTctListLTctKy0vLS0uLS0tNS0rLTItKy4tLS03LS0tLS0tNS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAwADAQEAAAAAAAAAAAAABQYHAQQIAwL/xABLEAABAwIDBAYFBgoIBwEAAAABAAIDBBEFBhITITFBBxRRYXGRIjJSgbEVM2JygpIjNDVCQ3OhorKzFyRFU3R1wcMmVWSTo7TTFv/EABkBAQADAQEAAAAAAAAAAAAAAAACAwQBBf/EAC8RAQACAgAEAwcCBwAAAAAAAAABAgMRBBIhMUFh8BMiMnGBodFRkRQzQkPB4fH/2gAMAwEAAhEDEQA/ANxREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERVLM2eoaWTqtPG+qqzuEEW/Se2RwvpHdvPu3rsVmezkzEd1sJVYxrP+GUh0SVTXPvbREDM7V7J0XDT4kLP8yVz3XON4gW33jDqIgut2TPvYfaJ7iq2c9dXGjDKGmpBawkLBUTkciZH/AAsVopw8yotm008Z8rJ79SwOteOTptNK094JuCPevnJmDH+JocPhHIS1jSfNr1i+IZkrqgkzVlQ/uMzw37gIaPJROkdg8lfHDR5fdTPEN9ZmDHid1Nhbz7LavefN6+ozhisO+pwGYt9qCdlQbdoa0H4rz9pHYPJdyixWop7bComjtv8AQleweQNl2eGjy+/5P4j5t/w/pMw2R2zlkkppObKiIxW8Xb2j3kK3wTskaHse1zSLhzXBwI7QRuK850/SDVlojrGU9ZH7NRCxzrfRe0Ag95upfAsRonP1YbWTYZOTfYzPM1HK72dZ4X4XcPAKi/D69bW1zxLeUVCw3PklPI2lxiAUz3epO06qabvD9+nt4m3OyvbHggEEEEXBBuCO0LPas17r4tE9n6REUUhERAREQEREBERAREQEREBERAXBK5Wc50xqSunkwqllEcUbDJX1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lWNmmZhEGIwhukxzt9ET6fZdax7Ldzlu4fJ+rHnxqQiItrGIiICIiAiIgIiICIiAtBwjCpIqCCjj3VWKzNv2xYdH6Wo9x9J3e2/YoDJmBMqZH1FSdNJTja1D7esBvbAO1zzusOXeQte6PKCSplmxqpZpfO3Z00dvmaJvq27NVh8fzlmz5NfT1H5acOPa60NIyCKOGMWYyNsbR2NaAAPILsIi81vEREBERAREQEREBERAREQFn2dcDmpZzi9DGJLs0VtNa7amntZzre0B3d/aHaCi7W01naNq7h5pzRl2Nkba+gcZKKR1geL6aQ/oJRytfc7nu7i6sLesx5TnpJZa7C2Mc2QHrVC4AxVLD6xa07g7ed3lza7Oq7K0NcHz4SXam3M1BIdM8Dh62zv84wHlxHDjuHo4s0THX182HJhmJ6KUi/UkZaS1wIINiCCCCOIIO8FflaWcREQEREBEXCDlS+WsvTYhKY47NYxuuaZ+6OGLm9x8AbDnbsBIkMDyg+SPrdbIKSkG/avHpy/RhjO9xPI2t2X4K+YFl9+KRshiifR4U12oMuWz1zh+kkdx0m3HyvuLaMmaIjoux4pnu+eXcFZiboqana9uFUslyXbnYhVD1nu+jfyG7jYN1xjQAAAAALADcAOwL5UVJHDGyKJjWMY0Na1osGtHIBfdede/NLfSvKIiKCYiIgIiICIiAiIgIiICIiAiIgKr5oyRTVzhO0vgqW72VEJ0PB4DVb1hy7bcCrQi7EzHWHJiJ7sezFhtSwacYw/rjALNrqQaKhrRw2jRx940jvVUGTqeq34biVPNfhDMerTi3IB2557xYL0XZQON5Mw6tuaikic48XtBjf73ssT71opxEx6/wpthiXn3EMn4lT/O0NR4tjMzfvR3Chpo3R+u1zfrAt+K37+jp0P4liuIU45M2u2jH2Da48UOW8cbubjcbx9Ohiv/AKq+OKjy+/8AtTPD/N5+jOo2bvPYN58gpOhy7WzkCKjqX35iCTT94i37Vtv/AOdx7/nMDe9tDFf4Lk5ErJt1Xjlc8cxEG0wI7NxI/Yk8THl9/wAORw/zZazIE0QD8QqqSib2SStklP1YmH0vNTmXqCnuPkjDpa2UH8cq27OmjPtMjNgSO/0h3rRcK6OsLp3axTCV9765nGc37bO9G/uVrYwAAAAACwAFgB2WVF+ImfWvX7rqYIhScJyHrlFXis5rJxva1wtBFzsyPgfeLbuF96u4bZcos9rTbuvisR2ERFx0REQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/Z"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
