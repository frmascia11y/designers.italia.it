import classNames from "classnames";
import * as React from "react";
import "./section-editorial.scss";
import ReactMarkdown from "react-markdown";
import TextImageCta from "../text-image-cta/text-image-cta";
import Numbers from "../numbers/numbers";
import TitleText from "../title-text/title-text";
import ImgFull from "../img-full/img-full";
import Highlight from "../highlight/highlight";
import Card from "../card/card";
import Kangaroo from "../kangaroo/kangaroo";
import ImageIcons from "../image-icons/image-icons";
import Table from "../table/table";
import Button from "../button/button";
import ComponentView from "../component-view/component-view";

function SectionEditorial({
  title,
  headingLevel,
  text,
  buttons,
  full,
  centered,
  fullColumn,
  background,
  components,
  menu,
  noSpace,
  id,
  componentViewerData,
}) {
  const SwitchComponents = {
    Highlight,
    Card,
    Kangaroo,
    TextImageCta,
    Numbers,
    TitleText,
    ImgFull,
    ImageIcons,
    Table,
    ComponentView,
  };

  // heading level
  let HLevel;
  if (headingLevel) {
    HLevel = `h${headingLevel}`;
  } else {
    HLevel = `h2`;
  }

  const container = classNames({
    "fullcolumn-editorial": fullColumn,
    "container-xxl": !fullColumn,
  });

  let row = classNames("row", { "flex-lg-row-reverse": menu });

  let grid;
  if (full) {
    grid = "col-12";
  } else {
    grid = classNames("col-12 col-md-10 offset-md-1 col-lg-7 offset-lg-1", {
      "m-auto": centered,
    });
  }
  if (full && menu) {
    grid = "col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-0";
  }
  if (fullColumn) {
    grid = "";
    row = "";
  }

  const styles = classNames("section-editorial", {
    [`bg-${background}`]: background,
    "py-0": noSpace,
    "text-white": background === "dark",
  });

  // buttons
  let ButtonsRender;
  if (buttons) {
    ButtonsRender = buttons.map((btn, index) => (
      <Button key={`button-${index}`} {...btn} />
    ));
  }

  // xxx a11y downgrade if title is not set, quick fix to review asap
  if (!title) {
    // eslint-disable-next-line no-param-reassign
    id = undefined;
  }

  return (
    <section className={styles} aria-describedby={id}>
      <div className={container}>
        <div className={row}>
          {menu && (
            <div className="d-none d-lg-block col-lg-3 offset-lg-1 affix-parent">
              <div className="sidebar-wrapper my-lg-0 affix-top">
                <div className="sidebar-linklist-wrapper">
                  <div className="link-list-wrapper">
                    <ul className="link-list">
                      <li>
                        <a className="list-item medium active" href="#">
                          <span>Link lista 1 (attivo)</span>
                        </a>
                      </li>
                      <li>
                        <a className="list-item medium" href="#">
                          <span>Link lista 3</span>
                        </a>
                      </li>
                      <li>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a className="list-item medium" href="#">
                          <span>Link lista 4</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={grid}>
            <div className="px-3 p-md-0">
              {title && (
                <HLevel className={text ? "mb-1" : "mb-0"} id={id}>
                  {title}
                </HLevel>
              )}
              {text && (
                <div className="text-container mb-5">
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
              )}
              {ButtonsRender && (
                <div className="buttons-wrapper mt-5">{ButtonsRender}</div>
              )}
              {components?.map((item, index) => {
                const Switcher = SwitchComponents[item.name];

                return (
                  <Switcher
                    key={`switcher-${index}`}
                    componentViewerData={
                      item.name === "ComponentView"
                        ? componentViewerData
                        : undefined
                    }
                    {...item}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionEditorial;
