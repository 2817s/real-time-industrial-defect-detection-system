from pathlib import Path
import xml.etree.ElementTree as ET

# Project root
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Dataset path
DATASET_PATH = PROJECT_ROOT / "dataset" / "NEU-DET"

TRAIN_IMAGES = DATASET_PATH / "train" / "images"
TRAIN_ANNOTATIONS = DATASET_PATH / "train" / "annotations"

VALID_IMAGES = DATASET_PATH / "validation" / "images"
VALID_ANNOTATIONS = DATASET_PATH / "validation" / "annotations"

def check_dataset():
    """Check whether the dataset folders exist."""

    if not DATASET_PATH.exists():
        print("Dataset not found!")
        return False

    print("Dataset found successfully.")
    return True


def count_files():
    """Count total images and annotation files."""

    train_images = list(TRAIN_IMAGES.rglob("*.jpg"))
    train_annotations = list(TRAIN_ANNOTATIONS.rglob("*.xml"))

    valid_images = list(VALID_IMAGES.rglob("*.jpg"))
    valid_annotations = list(VALID_ANNOTATIONS.rglob("*.xml"))

    print("\n========== Dataset Statistics ==========")
    print(f"Training Images      : {len(train_images)}")
    print(f"Training Annotations : {len(train_annotations)}")
    print(f"Validation Images    : {len(valid_images)}")
    print(f"Validation Annotations: {len(valid_annotations)}")

def check_missing_files():
    """Check whether every image has a matching XML annotation."""

    train_image_names = {img.stem for img in TRAIN_IMAGES.rglob("*.jpg")}
    train_xml_names = {xml.stem for xml in TRAIN_ANNOTATIONS.rglob("*.xml")}

    valid_image_names = {img.stem for img in VALID_IMAGES.rglob("*.jpg")}
    valid_xml_names = {xml.stem for xml in VALID_ANNOTATIONS.rglob("*.xml")}

    print("\n========== Missing File Check ==========")

    missing_xml = train_image_names - train_xml_names
    extra_xml = train_xml_names - train_image_names

    missing_xml_valid = valid_image_names - valid_xml_names
    extra_xml_valid = valid_xml_names - valid_image_names

    if missing_xml:
        print("\nTraining images without XML:")
        for name in sorted(missing_xml):
            print(name)

    if extra_xml:
        print("\nTraining XML without image:")
        for name in sorted(extra_xml):
            print(name)

    if missing_xml_valid:
        print("\nValidation images without XML:")
        for name in sorted(missing_xml_valid):
            print(name)

    if extra_xml_valid:
        print("\nValidation XML without image:")
        for name in sorted(extra_xml_valid):
            print(name)

    if (
        not missing_xml
        and not extra_xml
        and not missing_xml_valid
        and not extra_xml_valid
    ):
        print("No missing or mismatched files found.")


def extract_classes():
    """Extract all unique defect classes from XML files."""

    classes = set()

    for xml_file in TRAIN_ANNOTATIONS.rglob("*.xml"):
        tree = ET.parse(xml_file)
        root = tree.getroot()

        for obj in root.findall("object"):
            class_name = obj.find("name").text.strip()
            classes.add(class_name)

    print("\n========== Classes Found ==========")

    for idx, class_name in enumerate(sorted(classes)):
        print(f"{idx}. {class_name}")

    print(f"\nTotal Classes : {len(classes)}")

def dataset_summary():
    """Display final dataset summary."""

    train_images = len(list(TRAIN_IMAGES.rglob("*.jpg")))
    train_annotations = len(list(TRAIN_ANNOTATIONS.rglob("*.xml")))

    valid_images = len(list(VALID_IMAGES.rglob("*.jpg")))
    valid_annotations = len(list(VALID_ANNOTATIONS.rglob("*.xml")))

    total_images = train_images + valid_images
    total_annotations = train_annotations + valid_annotations

    print("\n======================================")
    print("         DATASET SUMMARY")
    print("======================================")

    print(f"Training Images      : {train_images}")
    print(f"Training XML         : {train_annotations}")

    print(f"Validation Images    : {valid_images}")
    print(f"Validation XML       : {valid_annotations}")

    print(f"\nTotal Images         : {total_images}")
    print(f"Total XML            : {total_annotations}")

    print("\nDataset inspection completed.")


if __name__ == "__main__":
    if check_dataset():
        count_files()
        check_missing_files()
        extract_classes()
        dataset_summary()